from turtle import *

t = Turtle()

def yin(radius, color1, color2, dist1):
    width(3)
    color("black", color1)
    begin_fill()
    circle(radius/2, 180)
    circle(radius, 180)
    circle(radius/2, -180)
    end_fill()
    right(90)
    teleport(y=dist1)
    color(color1, color2)
    begin_fill()
    circle(radius/5)
    end_fill()
    sety(0)
    seth(180)

def main():
    reset()
    yin(200, "black", "white", 100)
    yin(200, "white", "black", -100)
    ht()
    return "Done!"

if __name__ == "__main__":
    main()
    mainloop()


