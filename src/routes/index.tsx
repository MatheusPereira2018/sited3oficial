import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages_legacy/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D3 Data — Consultoria em Dados e IA" },
      {
        name: "description",
        content:
          "Transformamos dados em decisões. Consultoria estratégica em BI, Analytics, IA e Engenharia de Dados para empresas que querem crescer com inteligência.",
      },
      { property: "og:title", content: "D3 Data — Consultoria em Dados e IA" },
      {
        property: "og:description",
        content: "Transformamos dados em decisões. BI, Analytics, IA e Engenharia de Dados.",
      },
    ],
  }),
  component: Index,
});
