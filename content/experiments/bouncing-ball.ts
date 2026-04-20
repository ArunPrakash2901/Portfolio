const project = {
  slug: "bouncing-ball",
  name: "Ball simulation",
  oneLiner: "A random walk where a ball travels to the boundary wall each frame; built to understand circular geometry and non-blocking animation loops.",
  status: "completed",
  builtDate: "2025-02",
  stack: ["Python", "Turtle", "Tkinter"],
  githubUrl: "https://github.com/ArunPrakash2901/Python-practice-Fun-way-/blob/master/ball_simulation.py",
  linkedInPostUrl: "https://www.linkedin.com/posts/apkrishnasamy_datascience-learninginpublic-freshersjourney-activity-7437421812126420992-qMvd?utm_source=share&utm_medium=member_desktop&rcm=ACoAACkKbPIB7vRg4DCEjuleeiPs-FP8i2CGzvs",
  media: "/images/ball.gif",
  why: "I wanted to understand how real-time animation loops work without a game engine doing the work for me. Turtle and Tkinter are humble tools, which meant every frame, every button, and every coordinate had to be reasoned through manually.",
  hard: "The ball's starting position uses the square root method for uniform distribution inside a circle, without it, positions cluster toward the centre. Getting that right, and then separately solving the quadratic to find exactly where a ray from the ball's position hits the circular wall, were the two moments where the math stopped being abstract.",
  differently: "Decouple the physics from the renderer entirely. Right now the simulation speed is tied to the UI refresh rate. A headless physics layer would let you run the math faster than the screen can draw, which opens up 'multi-ball simulations' and makes the collision logic actually testable.",
  notes: [
    {
      title: "It's not bouncing, rather it's a random walk to the wall",
      body: "Each frame the ball picks a random angle, calculates the distance to the boundary in that direction using a quadratic, and jumps there. move_speed = 1.0 means it always travels the full distance. The result looks like bouncing but the mechanism is completely different."
    },
    {
      title: "Uniform placement via square root sampling",
      body: "Placing the ball at a random position inside a circle naively, `random r`, `random theta`,  produces clustering near the centre. Sampling r as `sqrt(random)` corrects the distribution so the ball is equally likely to appear anywhere inside the boundary."
    },
    {
      title: "Ontimer instead of a blocking loop",
      body: "The animation uses Turtle's ontimer to schedule the next frame rather than a while loop. This keeps the Tkinter thread free, which is why the Start, Stop, and Reset buttons stay responsive during the simulation."
    },
    {
      title: "Personal Note: On AI and losing depth",
      body: "The  endeavor of  doing it the old school way, was eye-opening, and made me realise how profound and great people were at that time in the programming space. As I was tackling obstacles, I was gaining more perspective, in terms of scope and overall awareness of the module  I was using. It is truly fascinating that we are living in this age of AI, however we are losing depth in whatever we are doing, which is taken care of AI. It is a double edged sword and one cannot catch it when it is mid-air."
    },
  ]
};

export default project;
