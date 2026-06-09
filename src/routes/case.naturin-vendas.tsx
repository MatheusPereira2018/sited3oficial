import { createFileRoute } from "@tanstack/react-router";
import CaseNaturin from "@/pages_legacy/CaseNaturin";

export const Route = createFileRoute("/case/naturin-vendas")({
  head: () => ({
    meta: [
      { title: "Case Naturin Vendas — D3 Data" },
      { name: "description", content: "Como a Naturin aumentou as vendas com analytics e IA." },
      { property: "og:title", content: "Case Naturin Vendas — D3 Data" },
      { property: "og:description", content: "Case Naturin: analytics e IA para crescer vendas." },
    ],
  }),
  component: CaseNaturin,
});
