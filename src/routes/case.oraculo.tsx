import { createFileRoute } from "@tanstack/react-router";
import CaseOraculo from "@/pages_legacy/CaseOraculo";

export const Route = createFileRoute("/case/oraculo")({
  head: () => ({
    meta: [
      { title: "Case Oráculo — D3 Data" },
      { name: "description", content: "Plataforma preditiva para tomada de decisões estratégicas." },
      { property: "og:title", content: "Case Oráculo — D3 Data" },
      { property: "og:description", content: "Case Oráculo: IA preditiva para decisões." },
    ],
  }),
  component: CaseOraculo,
});
