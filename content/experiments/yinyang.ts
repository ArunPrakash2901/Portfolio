const project = {
  slug: "yin-yang-generator",
  name: "Yin Yang",
  oneLiner: "Twenty lines of pure Turtle Graphics — drawn the old school way, no AI, no shortcuts.",
  status: "completed",
  builtDate: "2025-01",
  stack: ["Python", "Turtle Graphics"],
  githubUrl: "https://github.com/ArunPrakash2901/Python-practice-Fun-way-/blob/master/YinYang.py",
  customComponent: "YinYangCanvas",
  media: "/images/yinyang.png",
  why: "I gave myself a simple constraint: no AI assistance, no autocomplete, just the official documentation and my own reasoning. What started as a small discipline exercise became something more clarifying. Working through each arc manually, mentally tracking the turtle's heading across three nested circles — forced a kind of attention I hadn't used in a while. I came away with more respect for the people who built things this way before any of these tools existed.",
  hard: "Turtle Graphics is sequential and stateless in your mental model, you have to carry the turtle's orientation in your head across every move. Getting `begin_fill` and `end_fill` to nest correctly across multiple arcs, and then repositioning for the eye circles without drawing stray lines, required actually understanding the coordinate system rather than guessing and checking.",
  differently: "Make it fully parameterised, dynamic size, colour palettes, animation speed. There's a generative art tool in here if you let the geometry vary. The bones are already clean enough.",
  notes: [
    {
      title: "Twenty lines is the whole thing",
      body: "The yin yang is three circle calls per half — radius/2 for the inner curves, the full radius for the outer boundary, radius/5 for the eye. The sequence and the heading management between them is where all the complexity lives."
    },
    {
      title: "teleport() does the invisible work",
      body: "Repositioning the turtle for each eye circle without drawing a connecting line requires teleport() rather than goto(). A small thing, but you only know it exists if you read the docs rather than asking something to read them for you."
    },
    {
      title: "Personal Note: On AI and losing depth",
      body: "The endeavor of doing it the old school way was eye-opening and made me realise how profound and great people were at that time in the programming space. As I was tackling obstacles, I was gaining more perspective in terms of scope and overall awareness of the module I was using. It is truly fascinating that we are living in this age of AI; however, we are losing depth in whatever we are doing, which is taken care of by AI. It is a double-edged sword, and one cannot catch it when it is mid-air."
    }
  ]
};

export default project;
