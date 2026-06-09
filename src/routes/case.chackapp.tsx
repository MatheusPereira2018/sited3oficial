import { createFileRoute } from "@tanstack/react-router";
import CaseChackApp from "@/pages_legacy/CaseChackApp";

export const Route = createFileRoute("/case/chackapp")({
  head: () => ({
    meta: [
      { title: "Case ChackApp — D3 Data" },
      { name: "description", content: "Como o ChackApp foi construído com dados desde o início." },
      { property: "og:title", content: "Case ChackApp — D3 Data" },
      { property: "og:description", content: "Case ChackApp: dados desde o início." },
    ],
  }),
  component: CaseChackApp,
});
