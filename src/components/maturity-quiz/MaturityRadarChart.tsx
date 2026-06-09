import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { dimensions } from "./maturityQuizConfig";

interface MaturityRadarChartProps {
  scores: {
    governance: number;
    culture: number;
    infrastructure: number;
    analytics: number;
  };
}

export const MaturityRadarChart = ({ scores }: MaturityRadarChartProps) => {
  const data = dimensions.map(d => ({
    dimension: d.name.split(" ")[0], // First word only for chart
    fullName: d.name,
    score: scores[d.id],
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[300px] md:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          />
          <Radar
            name="Maturidade"
            dataKey="score"
            stroke="hsl(199 89% 48%)"
            fill="hsl(199 89% 48%)"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
