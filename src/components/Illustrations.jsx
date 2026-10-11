import { colonyById, plotsOf } from "../data/data.js";
import { num } from "../utils/format.js";

export function HouseSVG({ house }) {
  const { hue, floors, name } = house;
  const wall = `hsl(${hue} 28% 92%)`, roof = `hsl(${hue} 35% 30%)`, glass = `hsl(${hue} 45% 72%)`;
  const two = floors === 2;
  const top = two ? 52 : 82;
  const stroke = { stroke: "#14202b", strokeWidth: 2 };
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={`${name} illustration`}>
      <rect width="320" height="200" fill={`hsl(${hue} 45% 90%)`} />
      <circle cx="268" cy="38" r="18" fill="#e8b923" />
      <rect y="158" width="320" height="42" fill={`hsl(${hue} 30% 58%)`} />
      <rect y="158" width="320" height="4" fill={`hsl(${hue} 30% 40%)`} />
      <rect x="72" y={top} width="176" height={158 - top} fill={wall} {...stroke} />
      <polygon points={`62,${top} 160,${top - 36} 258,${top}`} fill={roof} {...stroke} />
      <rect x="146" y="118" width="28" height="40" fill={`hsl(${hue} 30% 35%)`} {...stroke} />
      <rect x="92" y={two ? 112 : 108} width="34" height="26" fill={glass} {...stroke} />
      <rect x="194" y={two ? 112 : 108} width="34" height="26" fill={glass} {...stroke} />
      {two && (
        <>
          <rect x="92" y="68" width="34" height="26" fill={glass} {...stroke} />
          <rect x="146" y="68" width="28" height="26" fill={glass} {...stroke} />
          <rect x="194" y="68" width="34" height="26" fill={glass} {...stroke} />
        </>
      )}
      <rect x="28" y="124" width="6" height="34" fill="#5b4632" />
      <circle cx="31" cy="116" r="19" fill="hsl(150 40% 36%)" />
      <rect x="284" y="130" width="6" height="28" fill="#5b4632" />
      <circle cx="287" cy="124" r="15" fill="hsl(150 40% 40%)" />
    </svg>
  );
}

const ARROWS = {
  North: "M160 18 L152 32 M160 18 L168 32 M160 18 V44",
  East: "M300 100 L286 92 M300 100 L286 108 M300 100 H274",
  South: "M160 182 L152 168 M160 182 L168 168 M160 182 V156",
  West: "M20 100 L34 92 M20 100 L34 108 M20 100 H46",
};

export function PlotSVG({ plot }) {
  const hue = colonyById(plot.colony).hue;
  const w = 150 + (plot.size - 1200) / 8;
  const h = 96 + (plot.size - 1200) / 40;
  const x = (320 - w) / 2, y = (200 - h) / 2 + 4;
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={`Plot ${plot.id}, ${plot.size} sq ft, ${plot.facing} facing`}>
      <rect width="320" height="200" fill={`hsl(${hue} 40% 92%)`} />
      <rect x={x - 14} y={y - 14} width={w + 28} height={h + 28} fill="#cdd3cd" />
      <rect x={x} y={y} width={w} height={h} fill={`hsl(${hue} 38% 70%)`} stroke="#14202b" strokeWidth="2" strokeDasharray="7 4" />
      <text x="160" y={y + h / 2 + 5} textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize="15" fill="#14202b">
        {num(plot.size)} sq ft
      </text>
      <path d={ARROWS[plot.facing]} stroke="#14202b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ColonySVG({ colony }) {
  const cell = 22, gap = 4, pad = 14;
  const W = pad * 2 + colony.cols * (cell + gap) + Math.floor((colony.cols - 1) / 4) * 10;
  const H = pad * 2 + colony.rows * (cell + gap);
  const fills = { sold: "#efd0cb", booked: "#f6e2bd", available: "#a9d3c3" };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${colony.name} layout`}>
      <rect width={W} height={H} fill={`hsl(${colony.hue} 40% 93%)`} />
      {plotsOf(colony.id).map((p) => (
        <rect key={p.id} x={pad + p.col * (cell + gap) + Math.floor(p.col / 4) * 10} y={pad + p.row * (cell + gap)}
          width={cell} height={cell} rx="3" fill={fills[p.status]} stroke="#14202b" strokeWidth="1" />
      ))}
    </svg>
  );
}
