import { useEffect, useState } from "react";

export default function Conversation({ open, contact, onClose, backendBase, light }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!open || !contact) return;
    const load = async () => {
      try {
        const res = await fetch(`${backendBase}/api/contacts/${contact._id}/conversation`).then(r => r.json());
        setData(res);
      } catch (e) {
        const now = new Date().toISOString();
        setData({
          contact,
          messages: [
            { type: 'sms', direction: 'inbound', timestamp: now, text: 'Hi, can you service my AC today?' },
            { type: 'sms', direction: 'outbound', timestamp: now, text: 'Yes! We can do 3pm or 5pm. Which works?' },
            { type: 'call', direction: 'outbound', timestamp: now, recording_url: 'https://file-examples.com/storage/fe1b0a8f03f6d0b8f4d1f9e/2017/11/file_example_MP3_700KB.mp3', duration_sec: 87 },
          ]
        });
      }
    };
    load();
  }, [open, contact, backendBase]);

  if (!open) return null;

  const baseBg = light ? "bg-white" : "bg-slate-900";
  const baseBorder = light ? "border-slate-200" : "border-sky-500/20";
  const baseText = light ? "text-slate-800" : "text-white";
  const subText = light ? "text-slate-600" : "text-slate-300";
  const bubbleIn = light ? "bg-slate-100" : "bg-slate-800";
  const bubbleOut = light ? "bg-sky-50" : "bg-sky-500/10";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative w-full max-w-3xl rounded-2xl border ${baseBorder} ${baseBg} shadow-xl overflow-hidden animate-in`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700/20">
          <div>
            <p className={`font-semibold ${baseText}`}>{data?.contact?.name || contact?.name}</p>
            <p className={`text-sm ${subText}`}>{data?.contact?.phone || contact?.phone}</p>
          </div>
          <button onClick={onClose} className="px-3 py-1.5 rounded-lg border border-slate-500/20 text-slate-300 hover:bg-slate-500/10">Close</button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {data?.messages?.map((m, i) => (
            <div key={i} className={`flex ${m.direction === 'inbound' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] rounded-xl px-3 py-2 ${m.direction === 'inbound' ? bubbleIn : bubbleOut}`}>
                <p className={`text-sm ${baseText}`}>{m.type === 'sms' ? (m.text || '') : 'Call Recording'}</p>
                {m.type === 'call' && m.recording_url && (
                  <audio className="mt-2 w-full" controls src={m.recording_url} />
                )}
                <p className={`mt-1 text-xs ${subText}`}>{new Date(m.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
