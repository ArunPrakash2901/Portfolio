const project = {
  slug: "yin-yang-generator",
  name: "Algorithmic Yin Yang",
  oneLiner: "A study in geometric sequencing and spatial coordinate management using pure Python Turtle graphics.",
  status: "live",
  builtDate: "2024",
  stack: ["Python", "Turtle Graphics", "Algorithmic Geometry"],
  githubUrl: "https://github.com/ArunPrakash2901/python-mini-projects",
  customComponent: "YinYangCanvas",
  why: "This project was born out of a personal 'No GenAI' challenge. I wanted to step away from LLM-assisted coding and force myself back into raw problem-solving by reading official documentation and manually calculating geometric paths without a visual editor.",
  hard: "The most difficult aspect was the sequential nature of Turtle Graphics. Without a visual canvas editor, I had to mentally map the turtle's orientation and position across multiple semi-circular paths, ensuring that 'begin_fill' and 'end_fill' calls were perfectly nested to create the interlocking composite shapes.",
  differently: "I would refactor the script to be fully parameterized, allowing it to accept dynamic user inputs for size, color palettes, and animation speeds, perhaps even evolving it into a generative art tool with randomized geometric variations.",
  notes: [
    {
      title: "Path Sequencing",
      body: "The core shape is constructed using a specific sequence of circular arcs: radius/2 for the inner curves and the full radius for the outer boundary, requiring precise management of the turtle's heading to maintain continuity."
    },
    {
      title: "Coordinate Teleportation",
      body: "I utilized the 'teleport' function to reposition the turtle for the 'eye' circles without drawing connecting lines, a technique that requires a solid grasp of the absolute Cartesian coordinate system relative to the center of the canvas."
    }
  ]
};

export default project;
