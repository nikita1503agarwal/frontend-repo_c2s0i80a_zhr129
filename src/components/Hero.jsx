import { Flame } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-slate-900 to-slate-900" />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10 sm:pt-24 sm:pb-16">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-sky-200">
            <Flame className="h-4 w-4 text-sky-300" />
            <span className="text-xs tracking-wide uppercase">HVAC AI Performance Dashboard</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            See your HVAC campaigns working in real time
          </h1>
          <p className="mt-4 max-w-2xl text-sky-100/80 text-lg">
            Instantly understand how your Inbound AI Employee and Outbound AI Employee are performing — from leads to booked jobs to revenue.
          </p>
        </div>
      </div>
    </section>
  );
}
