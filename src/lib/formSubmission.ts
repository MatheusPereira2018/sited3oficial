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

    const { error } = await supabase.from("leads").insert({
      name: contactInfo.name,
      email: contactInfo.email,
      phone: formattedPhone || null,
      company: contactInfo.company || null,
      origem,
      form_type: origem,
      payload: extras as any,
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
