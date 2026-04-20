const project = {
  slug: "chess-simulator",
  name: "Chess Engine in R",
  oneLiner: "Pushing R Shiny beyond its statistical roots to model a complex, rule-based system from first principles.",
  status: "live",
  builtDate: "2024",
  stack: ["R", "Shiny", "S3 Dispatch", "Rule Based Systems"],
  githubUrl: "https://github.com/MonashARP/game-package-kangaroos",
  liveUrl: "https://51axb3-arun-prakash.shinyapps.io/ChessR/",
  media: "/images/chess.png",
  why: "After watching the AlphaGo documentary, I became obsessed with how complex systems are represented mathematically. Coming from a Mechanical Engineering background, I wanted to treat the rules of Chess like a physical assembly-building the 'gears' of the logic from scratch in R to see if a tool built for statistics could handle a purely stateful UI game.",
  hard: "The most significant hurdle was mapping the recursive logic of king-safety. Every move requires simulating a temporary board state to ensure the king isn't left in check. As a self-taught programmer, solving this using matrix evaluations within Shiny’s single-threaded reactive loop was a massive lesson in how logic and performance intersect.",
  differently: "I would shift from an S3 object-oriented approach to R6 classes to better encapsulate piece behaviors, similar to how I'd model individual components in an engineering project. I'd also offload the move-generation to C++ via Rcpp to allow for a proper AI opponent without freezing the browser.",
  notes: [
    {
      title: "Matrix as a Spatial System",
      body: "I treated the 8x8 board as a spatial coordinate system, using a matrix of lists to store piece objects. This allowed me to apply my engineering intuition to move validation, treating piece trajectories like vector-based paths across a grid."
    },
    {
      title: "Interrupting the Loop",
      body: "Implementing pawn promotion required 'pausing' the game engine. I used Shiny's modal system to break the reactive flow and wait for user input, teaching me how to manage asynchronous state updates in a framework designed for linear data processing."
    },
    {
      title: "Material Evaluation",
      body: "While I didn't build a Minimax AI, I implemented a material-count engine that calculates board control in real-time. It treats the board state as a dataset, aggregating piece weights to provide a live score—bridging the gap between the game logic and my analytics training."
    }
  ]
};

export default project;
