import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import KPIs from "./components/KPIs";
import Trends from "./components/Trends";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [summary, setSummary] = useState(null);
  const [series, setSeries] = useState([]);
  const [channel, setChannel] = useState("all");
  const [loading, setLoading] = useState(true);

  const base = BACKEND ? BACKEND.replace(/\/$/, "") : "";

  useEffect(() => {
    const load = async () => {
      try {
        const s = await fetch(`${base}/api/metrics/summary`).then(r => r.json());
        setSummary(s);
        const t = await fetch(`${base}/api/metrics/timeseries${channel !== "all" ? `?channel=${channel}` : ""}`).then(r => r.json());
        setSeries(t.data || []);
      } catch (e) {
        // fallback demo data if backend not reachable
        const demo = {
          period: "last_14_days",
          totals: { leads: 320, booked: 180, revenue: 64000, roi: 3.1 },
          inbound: { leads: 170, booked: 100, revenue: 34000, roi: 3.5 },
          outbound: { leads: 150, booked: 80, revenue: 30000, roi: 2.7 },
        };
        setSummary(demo);
        setSeries([
          { date: "2024-01-01", leads: 10, booked: 4, revenue: 1600 },
          { date: "2024-01-02", leads: 12, booked: 6, revenue: 2100 },
          { date: "2024-01-03", leads: 14, booked: 5, revenue: 1900 },
          { date: "2024-01-04", leads: 16, booked: 7, revenue: 2500 },
          { date: "2024-01-05", leads: 18, booked: 8, revenue: 3100 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Header />
      <Hero />

      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 -mt-6 sm:-mt-10">
        <div className="text-sky-200/80 text-sm">Campaign window: Last 14 days</div>
        <div className="flex items-center gap-2">
          {[
            { key: "all", label: "All" },
            { key: "inbound", label: "Inbound" },
            { key: "outbound", label: "Outbound" },
          ].map((c) => (
            <button key={c.key} onClick={() => setChannel(c.key)}
              className={`px-3 py-1.5 rounded-xl border transition-colors text-sm ${channel === c.key ? "bg-sky-500/20 border-sky-400/40 text-white" : "border-sky-500/20 text-sky-200 hover:bg-sky-500/10"}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <KPIs summary={summary} />
      <Trends series={series} />

      <footer className="border-t border-sky-500/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-sm text-sky-200/70">
          <p>
            Built for HVAC owners and operators. Colors inspired by trusted industry tones: sky blue, cyan and slate.
          </p>
        </div>
      </footer>
    </div>
  );
}
