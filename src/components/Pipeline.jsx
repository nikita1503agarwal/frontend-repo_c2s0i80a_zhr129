import { useMemo, useState } from "react";

const stages = [
  { key: "new", label: "New" },
  { key: "engaged", label: "Engaged" },
  { key: "qualified", label: "Qualified" },
  { key: "booked", label: "Booked" },
  { key: "completed", label: "Completed" },
];

export default function Pipeline({ contacts = [], onMove, onView, light }) {
  const grouped = useMemo(() => {
    const map = Object.fromEntries(stages.map(s => [s.key, []]));
    for (const c of contacts) {
      const k = c.stage || "new";
      if (!map[k]) map[k] = [];
      map[k].push(c);
    }
    return map;
  }, [contacts]);

  const handleDragStart = (e, contact) => {
    e.dataTransfer.setData("text/plain", contact._id);
  };

  const handleDrop = (e, stageKey) => {
    const id = e.dataTransfer.getData("text/plain");
    if (id) onMove?.(id, stageKey);
  };

  const baseCol = light ? "bg-white border-slate-200" : "bg-slate-800/60 border-sky-500/20";
  const baseTitle = light ? "text-slate-700" : "text-slate-200";
  const baseBadge = light ? "bg-slate-100 text-slate-700" : "bg-sky-500/10 text-sky-200";
  const baseCard = light ? "bg-slate-50 border-slate-200" : "bg-slate-900/50 border-sky-500/20";
  const baseBtn = light ? "text-slate-700 border-slate-300 hover:bg-slate-100" : "text-sky-200 border-sky-500/30 hover:bg-sky-500/10";

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <h2 className={`text-xl font-semibold mb-4 ${light ? "text-slate-800" : "text-white"}`}>Live Pipeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((s) => (
          <div key={s.key}
            className={`rounded-2xl border ${baseCol} p-3 md:p-4 min-h-[280px]`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, s.key)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-medium ${baseTitle}`}>{s.label}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${baseBadge}`}>{grouped[s.key]?.length || 0}</span>
            </div>

            <div className="space-y-3">
              {grouped[s.key]?.map((c) => (
                <div key={c._id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, c)}
                  className={`rounded-xl border ${baseCard} p-3 transition-shadow hover:shadow-lg`}
                >
                  <p className={`${light ? "text-slate-900" : "text-white"} font-semibold`}>{c.name}</p>
                  <p className={`${light ? "text-slate-600" : "text-slate-300"} text-sm`}>{c.phone}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.channel === 'inbound' ? (light ? 'bg-sky-100 text-sky-700' : 'bg-sky-500/15 text-sky-300') : (light ? 'bg-cyan-100 text-cyan-700' : 'bg-cyan-500/15 text-cyan-300')}`}>{c.channel}</span>
                    <button onClick={() => onView?.(c)} className={`text-xs px-2 py-1 rounded-lg border ${baseBtn}`}>View Contact</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
