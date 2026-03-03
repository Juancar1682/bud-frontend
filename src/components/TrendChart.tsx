import Card from './Card';

export type TrendPoint = {
  day: string;
  mood: number;
};

type TrendChartProps = {
  points: TrendPoint[];
};

function getLineGraphPoints(points: TrendPoint[], width: number, height: number) {
  const maxMood = 10;
  const minMood = 1;
  const xStep = width / Math.max(1, points.length - 1);

  return points.map((point, index) => {
    const x = index * xStep;
    const moodRange = maxMood - minMood;
    const normalized = (point.mood - minMood) / moodRange;
    const y = height - normalized * height;

    return { ...point, x, y };
  });
}

function TrendChart({ points }: TrendChartProps) {
  const chartWidth = 420;
  const chartHeight = 180;
  const chartPoints = getLineGraphPoints(points, chartWidth, chartHeight);
  const linePath = chartPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  const tickIndexes = [0, 7, 14, 21, 29].filter((index) => index < points.length);

  return (
    <Card title="30-Day Mood Trend" subtitle="Primary trend view" className="min-h-72">
      <div className="rounded-xl bg-bud-lightBg/65 p-3 dark:bg-black/20 sm:p-4">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-56 w-full" role="img" aria-label="Mood line graph trend">
          <defs>
            <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#539987" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#539987" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3].map((line) => {
            const y = (chartHeight / 3) * line;
            return <line key={line} x1={0} y1={y} x2={chartWidth} y2={y} className="stroke-black/10 dark:stroke-white/15" strokeWidth="1" />;
          })}

          {chartPoints.length > 1 ? <path d={`${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} fill="url(#trendArea)" /> : null}
          <path d={linePath} fill="none" stroke="#539987" strokeWidth="3" strokeLinecap="round" />

          {chartPoints.map((point) => (
            <g key={`${point.day}-${point.x}`}>
              <circle cx={point.x} cy={point.y} r="3.7" fill="#539987" />
              <circle cx={point.x} cy={point.y} r="1.8" fill="#FAF8D4" />
            </g>
          ))}
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs text-bud-darkBg/70 dark:text-bud-lightBg/70">
          {tickIndexes.map((index) => (
            <p key={index}>{points[index]?.day}</p>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default TrendChart;
