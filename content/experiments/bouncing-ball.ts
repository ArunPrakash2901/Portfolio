const project = {
  slug: "bouncing-ball",
  name: "Kinematic Canvas",
  oneLiner: "Hand-rolling a 2D physics engine to explore boundary collisions and kinematic animation loops.",
  status: "live",
  builtDate: "2024",
  stack: ["Python", "Tkinter", "Turtle Graphics", "Kinematics"],
  githubUrl: "https://github.com/ArunPrakash2901/python-mini-projects",
  media: ["/images/ball-sim.gif"],
  why: "Driven by the desire to understand the raw mathematics of physics engines, I avoided third-party libraries to implement boundary collision logic from scratch. This project served as a deep dive into bridging UI frameworks like Tkinter with real-time animation loops.",
  hard: "The primary technical hurdle was calculating the intersection between a linear trajectory and a circular boundary. Implementing the trigonometry to keep the ball strictly within the radius R while maintaining a smooth animation frame rate required careful optimization of the 'ontimer' event loop.",
  differently: "I would decouple the physics calculations from the rendering logic. By making the engine 'headless,' I could run simulations at higher speeds than the UI refresh rate, allowing for more complex multi-ball collisions and automated unit testing of the collision math.",
  notes: [
    {
      title: "Circular Boundary Math",
      body: "Collisions are handled by solving the quadratic distance between the ball's (x, y) coordinates and the circle's perimeter, ensuring the ball never 'leaks' outside the boundary regardless of its velocity."
    },
    {
      title: "Non-Blocking Event Loop",
      body: "To keep the UI responsive while animating, I used the Turtle 'ontimer' method. This schedules the next frame without blocking the main Tkinter thread, allowing the control buttons to remain interactive during the simulation."
    },
    {
      title: "The Power of Raw Documentation",
      body: "This project reinforced the value of reading standard library docs. Eschewing GenAI tools forced me to understand the underlying 'under-the-hood' mechanics of how Turtle manages its screen state and coordinate transformations."
    }
  ]
};

export default project;
