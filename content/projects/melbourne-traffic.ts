const project = {
  slug: "melbourne-traffic",
  name: "Melbourne Traffic Scarcity",
  oneLiner: "Real-time scarcity outlook dashboard for Melbourne metropolitan traffic.",
  status: "Active",
  builtDate: "2023-11",
  stack: ["TypeScript", "Next.js", "D3.js", "PostgreSQL"],
  githubUrl: "https://github.com/ArunPrakash2901/melbourne-traffic",
  why: "To visualize traffic congestion patterns and predict scarcity in parking/lane availability.",
  hard: "Optimizing D3.js renders for large-scale geographic coordinate data.",
  differently: "I would use Deck.gl for better WebGL-powered visualization performance.",
  notes: [
    "Integrated live feeds from VicRoads Open Data.",
    "Built a custom hexagonal binning algorithm for heatmaps.",
    "Features predictive congestion modeling for the next 60 minutes."
  ],
  liveUrl: "https://traffic.melbourne.dev"
};

export default project;

