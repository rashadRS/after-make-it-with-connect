export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 48 48" className="drop-shadow">
        <rect x="6" y="12" width="36" height="24" rx="5" fill="url(#g)"/>
        <path d="M15 33h18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 6l2.2 4.8L31 13l-4.8 2.2L24 20l-2.2-4.8L17 13l4.8-2.2L24 6z" fill="#fff"/>
        <defs><linearGradient id="g" x1="6" y1="12" x2="42" y2="36"><stop stopColor="#4f46e5"/><stop offset="1" stopColor="#06b6d4"/></linearGradient></defs>
      </svg>
      <span className="text-sm font-bold tracking-wide">StudyTech Advisor</span>
    </div>
  );
}
