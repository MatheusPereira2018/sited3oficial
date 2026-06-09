// @ts-ignore - Deno import for Supabase Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Credenciais Basic Auth para o n8n
const N8N_USERNAME = 'D3DataSite';
const N8N_PASSWORD = 'd3datA@2026!';
const N8N_CREDENTIALS = btoa(`${N8N_USERNAME}:${N8N_PASSWORD}`);

// URL do webhook do n8n
const N8N_WEBHOOK_URL = 'https://primary-production-360e6.up.railway.app/webhook/sitelead';

serve(async (req) => {
  // Headers CORS - permitir acesso público
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
  };

  // Responder preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      message: 'Método não permitido'
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }

  try {
    // Pegar os dados do body
    const requestData = await req.json();

    console.log('Dados recebidos:', requestData);
    console.log('URL do N8N:', N8N_WEBHOOK_URL);

    try {
      // Enviar para o n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${N8N_CREDENTIALS}`
        },
        body: JSON.stringify(requestData),
      });

      console.log('Status da resposta do N8N:', response.status);

      const responseData = await response.text();
      console.log('Resposta do n8n:', responseData);

      // Retornar resposta
      return new Response(JSON.stringify({
        success: response.ok,
        message: response.ok ? 'Lead enviado com sucesso' : `Erro ao enviar lead (${response.status})`,
        data: responseData || null
      }), {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } catch (fetchError: unknown) {
      console.error('Erro ao fazer fetch para N8N:', fetchError);

      // Retornar resposta de sucesso para o frontend, mas logar o erro
      return new Response(JSON.stringify({
        success: true,
        message: 'Dados recebidos (erro no N8N será investigado)',
        debug: {
          n8nError: fetchError instanceof Error ? fetchError.message : 'Unknown error',
          url: N8N_WEBHOOK_URL,
          hasCredentials: !!N8N_CREDENTIALS
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

  } catch (error: unknown) {
    console.error('Erro na Edge Function:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Erro na conexão com o servidor',
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});