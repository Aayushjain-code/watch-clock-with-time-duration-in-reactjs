import React from "react";
import { WATCH_BARS_COLOR } from "./constants";
import "./style.css";

const DonutBarGraph = ({ segments, strokeWidth = 6, radius = 60 }) => {
  const viewBox = `0 0 ${radius * 2} ${radius * 2}`; // Viewbox of the SVG
  const cx = radius; // X coordinate of the center of the donut
  const cy = radius; // Y coordinate of the center of the donut

  // Get the current time as a Date object
  const now = new Date();

  // Calculate the positions of the hour and minute markers using trigonometric functions
  const hourPositions = Array.from(Array(24), (_, i) => i * 15).map((hour) => {
    const angle = ((hour - 90) * Math.PI) / 180;
    const x = cx + (radius - 15) * Math.cos(angle);
    const y = cy + (radius - 15) * Math.sin(angle);
    return { x, y };
  });

  const minutePositions = Array.from(Array(60), (_, i) => i * 6).map(
    (minute) => {
      const angle = ((minute - 90) * Math.PI) / 180;
      const x = cx + (radius - 10) * Math.cos(angle);
      const y = cy + (radius - 10) * Math.sin(angle);
      return { x, y };
    }
  );

  return (
    <svg viewBox={viewBox}>
      <circle
        cx={cx}
        cy={cy}
        r={radius - strokeWidth / 2}
        stroke="#D8D8D8"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Night label */}
      {/* Night label */}
      <text
        x={cx + 2}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="5"
        fontWeight="bold"
        transform={`translate(${
          (radius / 9.5) * Math.cos((Math.PI * 5.5) / 4)
        }, ${(radius / 2.5) * Math.sin((Math.PI * 5.5) / 4)})`}
      >
        Night
      </text>

      {/* Morning label */}
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="5"
        fontWeight="bold"
        transform={`translate(${
          (radius / 1.9) * Math.cos((Math.PI * 0.0) / 4)
        }, ${(radius / 25) * Math.sin((Math.PI * 6.5) / 4)})`}
      >
        Morning
      </text>

      {/* Afternoon label */}
      <text
        x={cx - 3}
        y={cy - 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="5"
        fontWeight="bold"
        transform={`translate(${
          (radius / 2.5) * Math.cos((Math.PI * 100) / 4)
        }, ${(radius / 4) * Math.sin((Math.PI * 0) / 2)})`}
      >
        Afternoon
      </text>

      {/* Evening label */}
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="5"
        fontWeight="bold"
        transform={`translate(${
          (radius / 2.5) * Math.cos((Math.PI * 10) / 4)
        }, ${(radius / 2.5) * Math.sin((Math.PI * 2.5) / 4)})`}
      >
        Evening
      </text>

      {/* Dotted line 1 */}
      <line
        x1={cx - (radius + 10) * Math.cos(Math.PI / 4)}
        y1={cy - (radius + 10) * Math.sin(Math.PI / 4)}
        x2={cx + (radius + 10) * Math.cos(Math.PI / 4)}
        y2={cy + (radius + 10) * Math.sin(Math.PI / 4)}
        stroke="#333"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2,2"
      />

      {/* Dotted line 2 */}
      <line
        x1={cx - (radius + 10) * Math.cos(Math.PI / 4)}
        y1={cy + (radius + 10) * Math.sin(Math.PI / 4)}
        x2={cx + (radius + 10) * Math.cos(Math.PI / 4)}
        y2={cy - (radius + 10) * Math.sin(Math.PI / 4)}
        stroke="#333"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2,2"
      />
      <circle
        cx={cx}
        cy={cy}
        r={radius - strokeWidth / 2}
        stroke="#D8D8D8"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Background circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius - strokeWidth / 2}
        stroke="#D8D8D8"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {segments.map((segment, index) => {
        const { startDegree, endDegree } = segment;
        const percentage = ((endDegree - startDegree) / 360) * 100;
        const startAngle = -90 + startDegree;
        const endAngle = startAngle + (endDegree - startDegree);

        return (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            className="segment"
            r={radius - strokeWidth / 2}
            stroke={WATCH_BARS_COLOR}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${endAngle - 6 - startAngle}, 360`}
            transform={`rotate(${startAngle + 3} ${cx} ${cy})`}
            fill="none"
          />
        );
      })}
      <g>
        {hourPositions.map((position, index) => (
          <text
            key={`hour-${index}`}
            x={position.x}
            y={position.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="5"
          >
            {index}
          </text>
        ))}
        {minutePositions.map((position, index) => (
          <circle
            key={`minute-${index}`}
            cx={position.x}
            cy={position.y}
            r="0.7"
            fill="#333"
          />
        ))}
        <circle cx={cx} cy={cy} r={radius * 0.03} fill="#000" />
      </g>
    </svg>
  );
};

export default DonutBarGraph;
