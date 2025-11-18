import { Menu, PhoneCall, Thermometer, Wrench } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/40 border-b border-sky-500/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 grid place-items-center text-white font-bold">AI</div>
          <div className="leading-tight">
            <p className="text-white font-semibold">HVAC Growth Hub</p>
            <p className="text-sky-200/70 text-xs">Inbound & Outbound AI Employees</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-slate-300">
          <a className="hover:text-white" href="#">Overview</a>
          <a className="hover:text-white" href="#">Inbound</a>
          <a className="hover:text-white" href="#">Outbound</a>
          <a className="hover:text-white" href="#">Reports</a>
        </nav>
        <button className="sm:hidden p-2 rounded-lg border border-sky-500/20 text-slate-200">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
