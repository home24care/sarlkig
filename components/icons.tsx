type P = React.SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Icon = {
  Search: (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>),
  Cart: (p: P) => (<svg {...base} {...p}><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /><path d="M2 3h3l2.6 12.2a1.8 1.8 0 0 0 1.8 1.4h8.4a1.8 1.8 0 0 0 1.8-1.4L21 7H6" /></svg>),
  Menu: (p: P) => (<svg {...base} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>),
  Close: (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>),
  Home: (p: P) => (<svg {...base} {...p}><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></svg>),
  Truck: (p: P) => (<svg {...base} {...p}><rect x="1.5" y="6.5" width="12.5" height="10" rx="1" /><path d="M14 9.5h4l3.5 3.5v3.5H14" /><circle cx="6" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></svg>),
  Shield: (p: P) => (<svg {...base} {...p}><path d="M12 21s7.5-3.5 7.5-9.5V5.5L12 3 4.5 5.5v6C4.5 17.5 12 21 12 21z" /></svg>),
  Lock: (p: P) => (<svg {...base} {...p}><rect x="5" y="10.5" width="14" height="10" rx="1.5" /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" /></svg>),
  Refresh: (p: P) => (<svg {...base} {...p}><path d="M20 12a8 8 0 1 1-2.4-5.7L20 8.5" /><path d="M20 3.5v5h-5" /></svg>),
  Chevron: (p: P) => (<svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>),
  ChevronRight: (p: P) => (<svg {...base} {...p}><path d="m9 6 6 6-6 6" /></svg>),
  Arrow: (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  Phone: (p: P) => (<svg {...base} {...p}><path d="M5 3.5h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.9 6.9L16 14l4.5 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" /></svg>),
  Mail: (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>),
  Clock: (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>),
  Warehouse: (p: P) => (<svg {...base} {...p}><path d="M3 20V9l9-5 9 5v11" /><path d="M7 20v-7h10v7M7 16h10" /></svg>),
  Info: (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></svg>),
  Check: (p: P) => (<svg {...base} strokeWidth={2.2} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>),
  Plus: (p: P) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>),
  Minus: (p: P) => (<svg {...base} {...p}><path d="M5 12h14" /></svg>),
  Star: (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" /></svg>),
};
