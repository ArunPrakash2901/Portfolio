import matplotlib.pyplot as plt
import numpy as np
import matplotlib.animation as animation


fig, ax = plt.subplots()
t = np.linspace(0, 3, 40)
g = -9.81


v0 = 5
z = g * t**2 / 2 + v0 * t

v02 = 13
z2 = g * t**2 / 2 + v02 * t

v03 =  20
z3 = g * t**2 / 2 + v03 * t

scat = ax.scatter(t[0], z[0], c = "b", s=5, label = f'v0 = {v0} m/s')
scat2 = ax.scatter(t[0], z3[0],c = "r", s = 5, label = f'v0 = {v03} m/s')

line2 = ax.plot(t[0], z2[0], label = f'v0 = {v02} m/s')[0]
ax.set(xlim=[0, 15], ylim=[-10, 25],label='Time [s]', ylabel='Z [m]')

ax.legend()

def update(frame):
    # for each frame, update the data stored on each artist.
    x1 = t[:frame]
    y1 = z[:frame]

    x2 = t[:frame]
    y2 = z3[:frame]
    #update the scatterplot:
    data1 = np.stack([x1, y1]). T
    data2 = np.stack([x2, y2]).T
    scat.set_offsets(data1)
    scat2.set_offsets(data2)
    #update the line plot:
    line2.set_xdata(t[:frame])
    line2.set_ydata(z2[:frame])
    return(scat, scat2, line2)

ani = animation.FuncAnimation(fig=fig, func=update, frames=100, interval=30)
plt.show()

