import { createFileRoute } from "@tanstack/react-router";
import CaseCopaMundo from "@/pages_legacy/CaseCopaMundo";

export const Route = createFileRoute("/case/copa-mundo")({
  head: () => ({
    meta: [
      { title: "Case Copa do Mundo — D3 Data" },
      { name: "description", content: "Análise de dados aplicada à Copa do Mundo." },
      { property: "og:title", content: "Case Copa do Mundo — D3 Data" },
      { property: "og:description", content: "Case Copa do Mundo: análise de dados esportivos." },
    ],
  }),
  component: CaseCopaMundo,
});
