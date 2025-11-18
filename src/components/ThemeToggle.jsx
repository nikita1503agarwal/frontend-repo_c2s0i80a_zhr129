import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ light, setLight }) {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setLight(stored === "light");
  }, [setLight]);

  useEffect(() => {
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <button
      onClick={() => setLight(v => !v)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors ${light ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-800/60 border-sky-500/20 text-sky-100 hover:bg-slate-800'}`}
      aria-label="Toggle theme"
    >
      {light ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="text-sm">{light ? 'Light' : 'Dark'}</span>
    </button>
  );
}
