from mpl_toolkits import mplot3d
import numpy as np
import matplotlib.pyplot as plt

def main():# {{{
    N = 10
    X=np.arange(-N,N,1)
    Y=np.arange(-N*2,N*2,2)
    U, V = np.meshgrid(X, Y)

    ax = plt.axes(projection='3d')
    Z1 = U ** 3 - V ** 3  - 50* U ** 2 

    ax.plot_wireframe(U, V, Z1)
    #ax.plot_surface(U, V, Z2)
    #Z2 = U *0 + V *0 - 20
    [DX, DY]=np.gradient(Z1, 1,1)

    fig, ax = plt.subplots()
    ax.quiver(X, Y, DX, DY)
    plt.show()
# }}}

main()
