import turtle
from tkinter import Button
import random
import math


class ball_simulation_app:
    """
    Main application for all simualtion
    Attributes:
        screen: Turtle screen object
        ball: Turtle object representing the ball
        R: Circle radius
        r_ball: Ball radius
        running: Flag to cntrol simulation state
    """


    def __init__(self, circle_radius=300, ball_radius = 10):
        """
        Initialize the application

        Arguments:
            circle_radius: Radius of the boundary circle
            ball_radius: Radius of the ball
        """
        self.R = circle_radius
        self.r_ball = ball_radius
        self.running = False #start as not running the appplication

        #these will be initiialized in the setup()
        self.screen = None
        self.ball = None
        self.boundary = None


    def setup(self):
        """
        Set up the turtle screen, boundary circle,  ball
        """
        # setup() variables
        self.screen = turtle.Screen()
        self.screen.setup(width=800, height=800)
        self.screen.title("Ball simulation")
        self.screen.bgcolor("white")

        #Boundary
        self._draw_boundary()

        # Create and position bal
        self._create_ball()

        # Crete buttons
        self._create_controls()

    def _draw_boundary(self):
        """
        Draw the circular boundary
        """
        self.boundary = turtle.Turtle()
        self.boundary.speed(0)
        self.boundary.penup()
        self.boundary.goto(0, -self.R)
        self.boundary.pendown()
        self.boundary.pensize(3)
        self.boundary.color("black")
        self.boundary.circle(self.R)
        self.boundary.ht()


    def _create_ball(self):
        """
        Create the ball and place it at a random position.
        """
        self.ball = turtle.Turtle()
        self.ball.shape("circle")
        self.ball.color("red")
        self.ball.shapesize(self.r_ball / 10) #scalling the ball size
        self.ball.penup()

        self._randomize_ball_position()

    def _randomize_ball_position(self):
        """
        Place the ball at a random position inside the circle..
        """
        #Using sqrt mthod for unifomr distribution
        movement_radius = self.R - self.r_ball
        theta = random.uniform(0, 2 * math.pi)
        r = movement_radius * math.sqrt(random.uniform(0,1))

        x = r * math.cos(theta)
        y = r * math.sin(theta)

        self.ball.goto(x, y)

        #Random initial velocity direction
        velocity_angle = random.uniform(0, 2 * math.pi)
        velocity_x = self.speed * math.cos(velocity_angle)
        velocity_y = self.speed * math.sin(velocity_angle)


    def _create_controls(self):
        """
        Create buttons
        """
        canvas = self.screen.getcanvas()

        #Start button
        self.start_btn = Button(
                canvas.master,
                text = "Start",
                command = self.start_simulation,
                bg = "green",
                fg = "white",
                font = ("Arial", 23, "bold"),
                padx = 10, 
                pady = 5
                )
        self.start_btn.pack(side="left", padx = 5)

        #Stop Button
        self.stop_btn = Button(
                canvas.master,
                text = "Stop",
                command = self.stop_simulation,
                bg = "red",
                fg = "white",
                font = ("Arial", 12, "bold"),
                padx = 10, pady = 5
                )

        self.stop_btn.pack(side="left", padx = 5)

        # Reset Button
        self.reset_btn = Button(
                canvas.master, 
                text = "Reset", 
                command = self.reset_simulation,
                bg = "blue",
                fg = "white",
                font = ("Arial", 12, "bold"),
                padx = 10,
                pady = 5
        )

        self.reset_btn.pack(side="left", padx=5)

    def start_simulation(self):
        """
        Start the ball movement.
        """
        if not self.running:
            self.running = True
            print("Simulation started")
            self._move_ball() # start the animation loop

    def stop_simulation(self):
        """
        Stop the ball movement
        """
        self.running = False
        print("Simulation stopped")

    def reset_simulation(self):
        """
        Reset the simulation - stoop and randomize the ball position 
        """
        self.running = False
        self._randomize_ball_position()
        print("Simulation reset")

    def 

    def _move_ball(self):
        """
        Move the ball oone step in random direction.
        This method gets called itself repeatedly using ontimer
        """
        # Check if simulation is still running
        if not self.running:
            return # stop the animation loop

        # Get current position
        x, y = self.ball.xcor(), self.ball.ycor()

        # Pick random direction
        theta = random.uniform(0, 2 * math.pi)

        # Calculate max distance the ball can travel
        max_dist = self._calculate_distance_to_boundary(x, y, theta)

        #  Adjusting the speed 
        # 1.0 = instant jump to boundary
        # 0.5 = move halfway
        # 0.1 = move slowly (smooth animation)
        move_speed = 1.0
        distance = max_dist * move_speed

        # Calculate new position
        new_x = x + distance * math.cos(theta)
        new_y = y + distance * math.sin(theta)

        # Move the ball 
        self.ball.goto(new_x, new_y)

        # Schedule  the next move, this makes sure the animation is not stopped
        self.screen.ontimer(self._move_ball, 5)


    def run(self):
        """
        Start the application main loop.
        """
        self.setup()
        print("Ball Simulation app initialiized")
        print("Click 'Start' to begin simulation")
        self.screen.mainloop()


def main():
    """
    Create and run the application 
    """
    app = ball_simulation_app(circle_radius = 200, ball_radius = 10)

    app.run()

if __name__ == "__main__":
    main()











