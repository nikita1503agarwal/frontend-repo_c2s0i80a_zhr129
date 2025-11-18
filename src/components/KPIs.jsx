import { TrendingUp, Phone, CalendarCheck, DollarSign, Gauge, Clock } from "lucide-react";

const Card = ({ title, value, subtitle, icon: Icon, trend }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-800/60 p-4 sm:p-6 shadow-xl">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-sky-500/10 to-cyan-400/5" />
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-300 text-sm">{title}</p>
        <p className="text-white text-2xl sm:text-3xl font-bold mt-1">{value}</p>
        {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {trend != null && (
          <span className={`text-xs px-2 py-1 rounded-full ${trend >= 0 ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
        <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">
          <Icon className="h-5 w-5 text-sky-300" />
        </div>
      </div>
    </div>
  </div>
);

export default function KPIs({ summary }) {
  const { totals, inbound, outbound } = summary || {};
  return (
    <section className="max-w-7xl mx-auto px-6 -mt-8 sm:-mt-12 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card title="Total Leads" value={totals?.leads?.toLocaleString() || "-"} subtitle="Last 14 days" icon={TrendingUp} trend={12} />
        <Card title="Booked Jobs" value={totals?.booked?.toLocaleString() || "-"} subtitle="Last 14 days" icon={CalendarCheck} trend={8} />
        <Card title="Revenue" value={`$${(totals?.revenue || 0).toLocaleString()}`} subtitle="Estimated HVAC revenue" icon={DollarSign} trend={15} />
        <Card title="ROI" value={`${(totals?.roi || 0).toFixed(2)}x`} subtitle="Overall return" icon={Gauge} trend={5} />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-sky-500/20 bg-slate-800/60 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Inbound AI Employee</h3>
            <div className="flex items-center gap-2 text-sky-200 text-sm"><Phone className="h-4 w-4"/> Calls, chats, web forms</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-slate-300">Leads</p>
              <p className="text-white text-xl font-semibold">{inbound?.leads?.toLocaleString() || '-'}</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-slate-300">Booked</p>
              <p className="text-white text-xl font-semibold">{inbound?.booked?.toLocaleString() || '-'}</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-slate-300">Revenue</p>
              <p className="text-white text-xl font-semibold">${(inbound?.revenue || 0).toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-slate-300">ROI</p>
              <p className="text-white text-xl font-semibold">{(inbound?.roi || 0).toFixed(2)}x</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Outbound AI Employee</h3>
            <div className="flex items-center gap-2 text-cyan-200 text-sm"><Clock className="h-4 w-4"/> SMS, email, voicemail drops</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-slate-300">Leads</p>
              <p className="text-white text-xl font-semibold">{outbound?.leads?.toLocaleString() || '-'}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-slate-300">Booked</p>
              <p className="text-white text-xl font-semibold">{outbound?.booked?.toLocaleString() || '-'}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-slate-300">Revenue</p>
              <p className="text-white text-xl font-semibold">${(outbound?.revenue || 0).toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <p className="text-slate-300">ROI</p>
              <p className="text-white text-xl font-semibold">{(outbound?.roi || 0).toFixed(2)}x</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
