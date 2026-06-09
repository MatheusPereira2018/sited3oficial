import { createFileRoute } from "@tanstack/react-router";

// Credenciais Basic Auth para o n8n
const N8N_USERNAME = "D3DataSite";
const N8N_PASSWORD = "d3datA@2026!";
const N8N_WEBHOOK_URL = "https://primary-production-360e6.up.railway.app/webhook/sitelead";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

export const Route = createFileRoute("/api/public/webhook")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const requestData = await request.json();
          const credentials = btoa(`${N8N_USERNAME}:${N8N_PASSWORD}`);

          const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${credentials}`,
            },
            body: JSON.stringify(requestData),
          });

          const responseText = await n8nResponse.text();
          let responseData: unknown = responseText;
          try {
            responseData = JSON.parse(responseText);
          } catch {
            // keep as text
          }

          if (!n8nResponse.ok) {
            console.error("Erro do N8N:", n8nResponse.status, responseText);
            return Response.json(
              {
                success: false,
                message: "Erro ao enviar para o N8N",
                status: n8nResponse.status,
                error: responseData,
              },
              { status: 500, headers: corsHeaders },
            );
          }

          return Response.json(
            { success: true, message: "Dados enviados com sucesso!", data: responseData },
            { status: 200, headers: corsHeaders },
          );
        } catch (error) {
          console.error("Erro no webhook:", error);
          return Response.json(
            {
              success: false,
              message: "Erro interno no servidor",
              error: error instanceof Error ? error.message : String(error),
            },
            { status: 500, headers: corsHeaders },
          );
        }
      },
    },
  },
});
