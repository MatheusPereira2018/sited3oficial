import { createFileRoute } from "@tanstack/react-router";
import Cases from "@/pages_legacy/Cases";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Cases — D3 Data" },
      { name: "description", content: "Conheça os cases de sucesso da D3 Data em projetos de dados, BI e IA." },
      { property: "og:title", content: "Cases — D3 Data" },
      { property: "og:description", content: "Cases de sucesso em dados, BI e IA." },
    ],
  }),
  component: Cases,
});
