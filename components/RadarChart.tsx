"use client";

import { ResponsiveRadar } from '@nivo/radar'

interface RadarData {
  competency: string;
  score: number;
  contributingProjects?: string[];
  [key: string]: unknown;
}

interface RadarChartProps {
  data: RadarData[];
}

export default function RadarChart({ data }: RadarChartProps) {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveRadar
        data={data}
        keys={['score']}
        indexBy="competency"
        maxValue={100}
        margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
        curve="linearClosed"
        borderWidth={1.5}
        borderColor="#9B8B6E"
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={24}
        enableDots={true}
        dotSize={4}
        dotColor="#F7F4EF"
        dotBorderWidth={1.5}
        dotBorderColor="#9B8B6E"
        enableDotLabel={false}
        colors={['#9B8B6E']}
        fillOpacity={0.18}
        blendMode="normal"
        animate={true}
        theme={{
          background: "transparent",
          text: {
            fill: "#5A5650",
            fontSize: 10,
            fontFamily: "var(--font-dm-sans), sans-serif",
          },
          grid: {
            line: {
              stroke: "#D4C9B8",
              strokeWidth: 0.5,
            }
          },
        }}
        sliceTooltip={({ index, data: chartData }) => {
          const item = (chartData as any[]).find((d: any) => d.competency === index) || {} as any;
          const projects = item.contributingProjects || [];
          
          return (
            <div className="bg-[#EFEBE3] border-[0.5px] border-[#D4C9B8] p-4 flex flex-col gap-2 min-w-[200px] font-sans shadow-lg rounded-md relative z-50">
              <div className="flex justify-between items-center border-b-[0.5px] border-[#D4C9B8] pb-2 mb-1">
                <span className="text-[#9B8B6E] text-[10px] font-medium uppercase tracking-widest">{item.competency}</span>
                <span className="text-[#1A1814] font-serif tracking-tight font-medium text-lg">
                  {item.score}
                </span>
              </div>
              
              {projects.length > 0 ? (
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[#5A5650] text-[9px] uppercase tracking-widest">Contributing Evidence:</span>
                  <ul className="flex flex-col gap-1">
                    {projects.map((p: string, i: number) => (
                      <li key={i} className="text-[#1A1814] text-xs font-medium truncate before:content-['>'] before:mr-2 before:text-[#9B8B6E]">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-[#9B8B6E] text-xs italic mt-1">No contributing sets mapped.</div>
              )}
            </div>
          );
        }}
      />
    </div>
  )
}
