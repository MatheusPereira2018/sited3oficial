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
 * Automação N8N desativada — a conta antiga foi perdida.
 * Por ora, o envio é um no-op de sucesso: o frontend continua
 * exibindo confirmação e (quando aplicável) redireciona o usuário
 * para o WhatsApp. Um novo fluxo será criado posteriormente.
 */
export async function submitFormToN8N(
  contactInfo: ContactInfo,
  additionalInfo: AdditionalInfo,
): Promise<SubmissionResult> {
  console.log("[formSubmission] N8N desativado — payload ignorado:", {
    contactInfo,
    additionalInfo,
  });
  return {
    success: true,
    message: "Dados recebidos",
  };
}

// Função helper para validar dados de contato
export function validateContactInfo(contactInfo: ContactInfo): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!contactInfo.name?.trim()) {
    errors.push("Nome é obrigatório");
  }

  if (!contactInfo.email?.trim()) {
    errors.push("E-mail é obrigatório");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email.trim())) {
      errors.push("E-mail inválido");
    }
  }

  if (!contactInfo.company?.trim()) {
    errors.push("Empresa é obrigatória");
  }

  if (!contactInfo.phone?.trim()) {
    errors.push("Telefone é obrigatório");
  } else {
    const cleanPhone = contactInfo.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      errors.push("Telefone deve ter pelo menos 10 dígitos (DDD + número)");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
