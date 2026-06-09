import { createFileRoute } from "@tanstack/react-router";
import Palestras from "@/pages_legacy/Palestras";

export const Route = createFileRoute("/palestras")({
  head: () => ({
    meta: [
      { title: "Palestras — D3 Data" },
      { name: "description", content: "Palestras e treinamentos da D3 Data sobre dados, IA e transformação digital." },
      { property: "og:title", content: "Palestras — D3 Data" },
      { property: "og:description", content: "Palestras sobre dados, IA e transformação digital." },
    ],
  }),
  component: Palestras,
});
