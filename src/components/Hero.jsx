import { Flame } from "lucide-react";

export default function Hero({ light }) {
  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${light ? 'from-sky-300/20 via-white to-white' : 'from-sky-500/10 via-slate-900 to-slate-900'}`} />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10 sm:pt-24 sm:pb-16">
        <div className="flex flex-col items-center text-center">
          <div className={`inline-flex items-center gap-3 rounded-full border px-3 py-1 ${light ? 'border-sky-300 bg-sky-50 text-sky-700' : 'border-sky-400/30 bg-sky-500/10 text-sky-200'}`}>
            <Flame className={`h-4 w-4 ${light ? 'text-sky-600' : 'text-sky-300'}`} />
            <span className="text-xs tracking-wide uppercase">HVAC AI Performance Dashboard</span>
          </div>

          <h1 className={`mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${light ? 'text-slate-900' : 'text-white'}`}>
            See your HVAC campaigns working in real time
          </h1>
          <p className={`mt-4 max-w-2xl text-lg ${light ? 'text-slate-700' : 'text-sky-100/80'}`}>
            Instantly understand how your Inbound AI Employee and Outbound AI Employee are performing — from leads to booked jobs to revenue.
          </p>
        </div>
      </div>
    </section>
  );
}
