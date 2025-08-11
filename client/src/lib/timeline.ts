export interface TimelineEntry {
  id: string;
  title: string;
  date: string; // YYYY-MM format
  href: string;
  description: string;
  contextLine?: string; // Optional "What this taught me:" line
  connectsTo?: string; // Optional ID of related project
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "equity-research-boeing",
    title: "Equity Research: Boeing",
    date: "2024-12",
    href: "/projects/boeing",
    description: "In-depth analysis of Boeing’s financials and market position.",
    contextLine: "Showed me that reading financials is only part of the picture. Even when BA was trading far above my valuation, its brand history, market share, and investor perception still carried it despite whistleblowers, questionable practices, and weak performance."
  },
  {
    id: "mandelbrot-excel",
    title: "Mandelbrot Set Visualization in Excel",
    date: "2025-01",
    href: "/projects/mandelbrot-excel",
    description: "Visualizing fractals using only Excel formulas and charts.",
    contextLine: "Taught me where Excel hits its limits, especially with VBA-heavy processes that lag or crash if not debugged. Also showed how to bend Excel’s native functions to produce results it was never built for, and how to model complex numbers in a way most math classes skip."
  },
  {
    id: "public-market-dashboard",
    title: "Public Market Dashboard",
    date: "2025-05",
    href: "/projects/bond-dashboard",
    description: "Interactive dashboard for municipal and corporate market data.",
    contextLine: "Helped me figure out how to pull, clean, and present massive datasets on bonds and CAFRs in a way investors actually care about. A big part was making sure the data was not only accurate but also meaningful, and learning the real work required to structure it all."
  },
  {
    id: "risk-modeling-engine",
    title: "Risk Modeling Engine",
    date: "2025-06",
    href: "/projects/risk-engine",
    description: "Turning scenario inputs into quantified risk scores.",
    contextLine: "Reinforced my understanding of distributions, variance, and bias. Running multiple layers of simulations showed how much randomness markets really have and how breaking down scenarios into numbers can make uncertainty more manageable."
  },
  {
    id: "market-microstructure-model",
    title: "Market Microstructure Model",
    date: "2025-07",
    href: "/projects/market-microstructure",
    description: "Simulating order books to study market depth and latency.",
    contextLine: "Started as a crypto arbitrage bot and became a deep dive on how execution speed, slippage, and safeguards determine if a trade makes money or loses it. Also pushed me to solve real-world issues like ghost trades, gas fees, and liquidity traps."
  },
];

// Helper functions for timeline navigation
export const getTimelineEntry = (id: string): TimelineEntry | undefined => {
  return timelineEntries.find(entry => entry.id === id);
};

export const getConnectedEntries = (id: string): TimelineEntry[] => {
  const entry = getTimelineEntry(id);
  if (!entry?.connectsTo) return [];
  
  const connected = getTimelineEntry(entry.connectsTo);
  return connected ? [connected] : [];
};

export const getPreviousEntry = (id: string): TimelineEntry | undefined => {
  const currentIndex = timelineEntries.findIndex(entry => entry.id === id);
  return currentIndex > 0 ? timelineEntries[currentIndex - 1] : undefined;
};

export const getNextEntry = (id: string): TimelineEntry | undefined => {
  const currentIndex = timelineEntries.findIndex(entry => entry.id === id);
  return currentIndex < timelineEntries.length - 1 ? timelineEntries[currentIndex + 1] : undefined;
};
