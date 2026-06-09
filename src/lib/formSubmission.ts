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

export async function submitFormToN8N(
  contactInfo: ContactInfo,
  additionalInfo: AdditionalInfo
): Promise<SubmissionResult> {
  try {
    // Formatar telefone com +55 se válido
    const cleanPhone = contactInfo.phone ? contactInfo.phone.replace(/\D/g, '') : '';
    const formattedPhone = cleanPhone.length >= 10 ? `+55${cleanPhone}` : cleanPhone;

    const payload = {
      contactInfo: {
        ...contactInfo,
        phone: formattedPhone,
      },
      additionalInfo,
    };

    console.log(`🚀 Sending ${additionalInfo.origem} data to N8N...`);
    console.log("📋 Payload:", JSON.stringify(payload, null, 2));

    const response = await fetch(`/api/public/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📊 Response status:", response.status);
    console.log("✅ Response ok:", response.ok);

    let result;
    try {
      result = await response.json();
      console.log("📦 Response result:", result);
    } catch (parseError) {
      const textResult = await response.text();
      console.log("📄 Response text:", textResult);
      result = { success: false, message: textResult };
    }

    if (!result.success) {
      console.error(`❌ Error sending ${additionalInfo.origem} to N8N:`, result.message);
      console.error("📋 Full result:", result);
      return {
        success: false,
        message: result.message || "Erro ao enviar dados",
        data: result
      };
    } else {
      console.log(`✅ ${additionalInfo.origem} data sent to N8N successfully:`, result);
      return {
        success: true,
        message: result.message || "Dados enviados com sucesso",
        data: result
      };
    }
  } catch (error) {
    console.error(`💥 Error sending ${additionalInfo.origem} to N8N:`, error);
    console.error("🔍 Error details:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido",
      data: error
    };
  }
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
    const cleanPhone = contactInfo.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errors.push("Telefone deve ter pelo menos 10 dígitos (DDD + número)");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}