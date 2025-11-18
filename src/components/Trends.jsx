const Line = ({ color = "#38bdf8", values = [], light }) => {
  const width = 320;
  const height = 100;
  const padding = 8;
  if (!values || values.length === 0) return null;
  const max = Math.max(...values) || 1;
  const step = (width - padding * 2) / (values.length - 1 || 1);
  const points = values.map((v, i) => {
    const x = padding + i * step;
    const y = height - padding - (v / max) * (height - padding * 2);
    return `${x},${y}`;
  });
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2.5" points={points.join(" ")} />
      <polygon fill="url(#grad)" points={`${points.join(" ")} ${width - padding},${height - padding} ${padding},${height - padding}`} />
    </svg>
  );
};

export default function Trends({ series, light }) {
  const leads = series?.map(d => d.leads) || [];
  const booked = series?.map(d => d.booked) || [];
  const revenue = series?.map(d => d.revenue) || [];
  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`rounded-2xl border p-6 ${light ? 'border-slate-200 bg-white' : 'border-sky-500/20 bg-slate-800/60'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${light ? 'text-slate-900' : 'text-white'} font-semibold`}>Leads Over Time</h3>
            <span className={`${light ? 'text-slate-500' : 'text-sky-200/80'} text-xs`}>Last 14 days</span>
          </div>
          <Line color={light ? '#0284c7' : '#38bdf8'} values={leads} light={light} />
        </div>
        <div className={`rounded-2xl border p-6 ${light ? 'border-slate-200 bg-white' : 'border-cyan-500/20 bg-slate-800/60'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${light ? 'text-slate-900' : 'text-white'} font-semibold`}>Booked Jobs</h3>
            <span className={`${light ? 'text-slate-500' : 'text-cyan-200/80'} text-xs`}>Last 14 days</span>
          </div>
          <Line color={light ? '#0891b2' : '#06b6d4'} values={booked} light={light} />
        </div>
        <div className={`rounded-2xl border p-6 ${light ? 'border-slate-200 bg-white' : 'border-indigo-500/20 bg-slate-800/60'}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`${light ? 'text-slate-900' : 'text-white'} font-semibold`}>Revenue</h3>
            <span className={`${light ? 'text-slate-500' : 'text-indigo-200/80'} text-xs`}>Last 14 days</span>
          </div>
          <Line color={light ? '#6366f1' : '#818cf8'} values={revenue} light={light} />
        </div>
      </div>
    </section>
  );
}
