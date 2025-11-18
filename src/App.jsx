import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import KPIs from "./components/KPIs";
import Trends from "./components/Trends";
import Pipeline from "./components/Pipeline";
import Conversation from "./components/Conversation";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

export default function App() {
  const [summary, setSummary] = useState(null);
  const [series, setSeries] = useState([]);
  const [channel, setChannel] = useState("all");
  const [contacts, setContacts] = useState([]);
  const [light, setLight] = useState(false);
  const [openConv, setOpenConv] = useState(false);
  const [activeContact, setActiveContact] = useState(null);

  const base = BACKEND ? BACKEND.replace(/\/$/, "") : "";

  // Metrics & trends
  useEffect(() => {
    const load = async () => {
      try {
        const s = await fetch(`${base}/api/metrics/summary`).then(r => r.json());
        setSummary(s);
        const t = await fetch(`${base}/api/metrics/timeseries${channel !== "all" ? `?channel=${channel}` : ""}`).then(r => r.json());
        setSeries(t.data || []);
      } catch (e) {
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
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  // Contacts for pipeline
  const loadContacts = async () => {
    try {
      const res = await fetch(`${base}/api/contacts`).then(r => r.json());
      setContacts(res || []);
    } catch (e) {
      setContacts([
        { _id: "1", name: "Alex Johnson", phone: "+1 (555) 201-3344", channel: "inbound", stage: "new" },
        { _id: "2", name: "Brianna Lee", phone: "+1 (555) 448-9920", channel: "outbound", stage: "engaged" },
        { _id: "3", name: "Carlos Martinez", phone: "+1 (555) 773-1102", channel: "inbound", stage: "qualified" },
      ]);
    }
  };
  useEffect(() => { loadContacts(); }, []);

  const moveContact = async (id, toStage) => {
    // optimistic update
    setContacts(prev => prev.map(c => (c._id === id ? { ...c, stage: toStage } : c)));
    try {
      await fetch(`${base}/api/contacts/${id}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: toStage })
      });
    } catch (e) {
      // reload to sync if backend failed
      loadContacts();
    }
  };

  const viewContact = (c) => {
    setActiveContact(c);
    setOpenConv(true);
  };

  return (
    <div className={`min-h-screen ${light ? 'bg-gradient-to-b from-white via-slate-50 to-white text-slate-800' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100'}`}>
      <Header light={light} setLight={setLight} />
      <Hero light={light} />

      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 -mt-6 sm:-mt-10">
        <div className={`${light ? 'text-slate-600' : 'text-sky-200/80'} text-sm`}>Campaign window: Last 14 days</div>
        <div className="flex items-center gap-2">
          {[
            { key: "all", label: "All" },
            { key: "inbound", label: "Inbound" },
            { key: "outbound", label: "Outbound" },
          ].map((c) => (
            <button key={c.key} onClick={() => setChannel(c.key)}
              className={`px-3 py-1.5 rounded-xl border transition-colors text-sm ${
                channel === c.key
                  ? (light ? 'bg-sky-100 border-sky-300 text-slate-900' : 'bg-sky-500/20 border-sky-400/40 text-white')
                  : (light ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-sky-500/20 text-sky-200 hover:bg-sky-500/10')
              }`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <KPIs summary={summary} light={light} />
      <Trends series={series} light={light} />
      <Pipeline contacts={contacts} onMove={moveContact} onView={viewContact} light={light} />

      <footer className={`border-t py-8 ${light ? 'border-slate-200' : 'border-sky-500/10'}`}>
        <div className={`max-w-7xl mx-auto px-6 text-sm ${light ? 'text-slate-600' : 'text-sky-200/70'}`}>
          <p>
            Built for HVAC owners and operators. Colors inspired by trusted industry tones.
          </p>
        </div>
      </footer>

      <Conversation open={openConv} contact={activeContact} onClose={() => setOpenConv(false)} backendBase={base} light={light} />
    </div>
  );
}
