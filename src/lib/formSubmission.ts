import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface AdditionalInfo {
  origem: string;
  [key: string]: any;
}

interface SubmissionResult {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Salva o lead no banco (tabela public.leads).
 * A automação N8N foi desativada — o lead fica disponível no painel admin
 * em /admin/leads.
 */
export async function submitFormToN8N(
  contactInfo: ContactInfo,
  additionalInfo: AdditionalInfo,
): Promise<SubmissionResult> {
  try {
    const cleanPhone = contactInfo.phone ? contactInfo.phone.replace(/\D/g, "") : "";
    const formattedPhone = cleanPhone.length >= 10 ? `+55${cleanPhone}` : cleanPhone;

    const { origem, ...extras } = additionalInfo;

    const { error } = await (supabase as any).from("leads").insert({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: formattedPhone || null,
      company: contactInfo.company || null,
      origem,
      form_type: origem,
      payload: extras,
    });

    if (error) {
      console.error("[leads] insert error:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Lead registrado" };
  } catch (error) {
    console.error("[leads] unexpected error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwClqfx0NN4yj4iH6KbjAEEK2I9R4-JnSjupIxY5FNfMD4JPHjYZg--YoSpoFJoiGDQ-g/exec";

interface GoogleLeadPayload {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo?: string;
  interesse?: string;
  mensagem?: string;
}

/**
 * Envia o lead para o Google Apps Script (planilha Google).
 * Usa no-cors + text/plain conforme exigido pelo endpoint; é fire-and-forget
 * e não bloqueia o fluxo principal em caso de falha.
 */
export async function submitLeadToGoogleSheets(
  lead: GoogleLeadPayload,
): Promise<boolean> {
  try {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      type: "lead",
      nome: lead.nome,
      email: lead.email,
      telefone: lead.telefone,
      empresa: lead.empresa,
      cargo: lead.cargo || "",
      interesse: lead.interesse || "",
      mensagem: lead.mensagem || "",
      origem: "site-d3",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    };

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("[google-sheets] submit error:", error);
    return false;
  }
}

interface DiagnosticoPayload {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  maturidade_dados: string;
  observacoes: string;
}

/**
 * Envia o resultado do diagnóstico de maturidade para o Google Apps Script.
 * Fire-and-forget: nunca bloqueia a exibição do resultado.
 */
export async function submitDiagnosticoToGoogleSheets(
  data: DiagnosticoPayload,
): Promise<void> {
  try {
    const payload = {
      type: "diagnostico",
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      empresa: data.empresa,
      cargo: "",
      area: "",
      desafio_principal: "",
      maturidade_dados: data.maturidade_dados,
      usa_ia: "",
      urgencia: "",
      faixa_investimento: "",
      observacoes: data.observacoes,
    };

    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[google-sheets] diagnostico error:", error);
  }
}

export function validateContactInfo(contactInfo: ContactInfo): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!contactInfo.name?.trim()) errors.push("Nome é obrigatório");

  if (!contactInfo.email?.trim()) {
    errors.push("E-mail é obrigatório");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email.trim())) {
    errors.push("E-mail inválido");
  }

  if (!contactInfo.company?.trim()) errors.push("Empresa é obrigatória");

  if (!contactInfo.phone?.trim()) {
    errors.push("Telefone é obrigatório");
  } else if (contactInfo.phone.replace(/\D/g, "").length < 10) {
    errors.push("Telefone deve ter pelo menos 10 dígitos (DDD + número)");
  }

  return { isValid: errors.length === 0, errors };
}
