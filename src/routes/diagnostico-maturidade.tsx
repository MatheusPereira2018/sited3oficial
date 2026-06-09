import { createFileRoute } from "@tanstack/react-router";
import DiagnosticoMaturidade from "@/pages_legacy/DiagnosticoMaturidade";

export const Route = createFileRoute("/diagnostico-maturidade")({
  head: () => ({
    meta: [
      { title: "Diagnóstico de Maturidade em Dados — D3 Data" },
      { name: "description", content: "Avalie a maturidade da sua empresa em dados e IA com nosso diagnóstico gratuito." },
      { property: "og:title", content: "Diagnóstico de Maturidade em Dados — D3 Data" },
      { property: "og:description", content: "Diagnóstico gratuito de maturidade em dados e IA." },
    ],
  }),
  component: DiagnosticoMaturidade,
});
