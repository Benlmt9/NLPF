import React from "react";

const cleanPercentage = (percentage : any) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct}:any) => {
  const r = 35;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"1rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }:any) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ percentage, colour, dimension }:any) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={100} height={100}>
      <g transform={`rotate(-90 ${"50 100"})`} >
        <Circle colour="lightgrey"/>
        <Circle colour={colour} pct={pct}/>
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default Pie;