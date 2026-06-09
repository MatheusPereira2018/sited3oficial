import { createFileRoute } from "@tanstack/react-router";
import CaseIARH from "@/pages_legacy/CaseIARH";

export const Route = createFileRoute("/case/ia-rh")({
  head: () => ({
    meta: [
      { title: "Case IA no RH — D3 Data" },
      { name: "description", content: "Como a IA transformou o RH com automação inteligente." },
      { property: "og:title", content: "Case IA no RH — D3 Data" },
      { property: "og:description", content: "Case de IA aplicada ao RH." },
    ],
  }),
  component: CaseIARH,
});
