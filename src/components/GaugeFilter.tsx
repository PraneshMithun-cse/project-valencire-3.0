"use client";

import { useRouter } from "next/navigation";

interface Option {
  label: string;
  value: string;
}

const CX = 200;
const CY = 190;
const R = 145;
const NEEDLE = 120;
const LABEL_R = R + 20;
const ARC_ANGLES = [145, 90, 35]; // standard math degrees (CCW from right)

function pt(deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) };
}

export default function GaugeFilter({
  options,
  selected,
  basePath,
}: {
  options: Option[];
  selected?: string;
  basePath: string;
}) {
  const router = useRouter();
  if (options.length < 2) return null;

  const count = Math.min(options.length, 3);
  const angles = ARC_ANGLES.slice(0, count);

  // Arc path (upper dome)
  const arcStart = pt(angles[0], R);
  const arcEnd = pt(angles[count - 1], R);

  // Minor ticks along the arc
  const minA = Math.min(...angles);
  const maxA = Math.max(...angles);
  const ticks: { x1: number; y1: number; x2: number; y2: number; w: number }[] = [];
  for (let a = minA; a <= maxA; a += 3) {
    const isMajor = a % 15 === 0;
    const o = pt(a, R);
    const i = pt(a, R - (isMajor ? 9 : 5));
    ticks.push({ x1: o.x, y1: o.y, x2: i.x, y2: i.y, w: isMajor ? 1.2 : 0.6 });
  }

  // Needle rotation from vertical (clockwise = positive)
  const selIdx = options.slice(0, count).findIndex((o) => o.value === selected);
  const needleRot = selIdx >= 0 ? -(angles[selIdx] - 90) : 0;

  return (
    <div className="flex justify-center mb-10">
      <svg
        viewBox="0 0 400 210"
        className="w-full max-w-[280px] sm:max-w-[320px]"
        style={{ overflow: "visible" }}
      >
        {/* Fine tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="black" strokeWidth={t.w}
          />
        ))}

        {/* Main arc */}
        <path
          d={`M ${arcStart.x.toFixed(2)} ${arcStart.y.toFixed(2)} A ${R} ${R} 0 0 0 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />

        {/* Bold tick at each option position */}
        {angles.map((a, i) => {
          const o = pt(a, R);
          const inn = pt(a, R - 14);
          return (
            <line
              key={i}
              x1={o.x} y1={o.y} x2={inn.x} y2={inn.y}
              stroke="black" strokeWidth="2"
            />
          );
        })}

        {/* Needle */}
        <g
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            transform: `rotate(${needleRot}deg)`,
            transition: "transform 0.55s cubic-bezier(0.34,1.4,0.64,1)",
          }}
        >
          <line
            x1={CX} y1={CY}
            x2={CX} y2={CY - NEEDLE}
            stroke="black" strokeWidth="1.5"
          />
        </g>

        {/* Pivot dot */}
        <circle cx={CX} cy={CY} r="5" fill="black" />
        <circle cx={CX} cy={CY} r="2" fill="white" />

        {/* G label */}
        <text
          x={CX} y={CY + 20}
          textAnchor="middle"
          fontSize="13"
          fontFamily="Georgia, serif"
          fill="black"
        >
          G
        </text>

        {/* Option labels */}
        {options.slice(0, count).map((opt, i) => {
          const lp = pt(angles[i], LABEL_R);
          const isActive = opt.value === selected;
          const anchor = i === 0 ? "end" : i === count - 1 ? "start" : "middle";
          const href = isActive ? basePath : `${basePath}?sort=${opt.value}`;

          return (
            <g
              key={opt.value}
              onClick={() => router.push(href)}
              style={{ cursor: "pointer" }}
            >
              <text
                x={lp.x}
                y={lp.y}
                textAnchor={anchor}
                fontSize="10"
                fontFamily="'Courier New', monospace"
                letterSpacing="0.12em"
                fontWeight={isActive ? "700" : "400"}
                fill={isActive ? "#000" : "#888"}
                style={{ userSelect: "none" }}
              >
                {opt.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
