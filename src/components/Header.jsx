import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ light, setLight }) {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-opacity-60 ${light ? 'bg-white/70 border-slate-200' : 'bg-slate-900/40 border-sky-500/10'} border-b`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-xl grid place-items-center text-white font-bold ${light ? 'bg-gradient-to-br from-sky-500 to-cyan-400' : 'bg-gradient-to-br from-sky-500 to-cyan-400'}`}>AI</div>
          <div className="leading-tight">
            <p className={`${light ? 'text-slate-900' : 'text-white'} font-semibold`}>HVAC Growth Hub</p>
            <p className={`${light ? 'text-slate-600' : 'text-sky-200/70'} text-xs`}>Inbound & Outbound AI Employees</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          <a className={`${light ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`} href="#">Overview</a>
          <a className={`${light ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`} href="#">Inbound</a>
          <a className={`${light ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`} href="#">Outbound</a>
          <a className={`${light ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`} href="#">Reports</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle light={light} setLight={setLight} />
          <button className={`sm:hidden p-2 rounded-lg border ${light ? 'border-slate-200 text-slate-700' : 'border-sky-500/20 text-slate-200'}`}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
