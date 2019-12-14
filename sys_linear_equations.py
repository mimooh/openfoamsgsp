from mpl_toolkits import mplot3d
from scipy import linalg
import numpy as np
import matplotlib.pyplot as plt
#plt.xkcd()

def main():# {{{

    N = 50
    X=np.arange(-N,N,10)
    Y=np.arange(-N*2,N*2,20)
    U, V = np.meshgrid(X, Y, indexing='xy')

    #  x  - y  + 4z = 0
    #  x  + 3y + 4z = 30
    #  4x + y  - z  = -50
    A=np.array(
        [
            [1 , -1 , 4  ] ,
            [1 , 3  , 4  ] ,
            [4 , 1  , -1 ] ,
        ]
    )
    B=np.array([0, 30, -50])

    # formatting "x - y  + 4z = 0" and friends for plotting
    Z0 = ( A[0][0] * U + A[0][1] * V - B[0] ) / - A[0][2]
    Z1 = ( A[1][0] * U + A[1][1] * V - B[1] ) / - A[1][2]
    Z2 = ( A[2][0] * U + A[2][1] * V - B[2] ) / - A[2][2]

    ax = plt.axes(projection='3d')
    ax.plot_surface(U , V , Z0 , color='C0' , alpha=0.4)
    ax.plot_surface(U , V , Z1 , color='C1' , alpha=0.4)
    ax.plot_surface(U , V , Z2 , color='C2' , alpha=0.3)

    C=np.linalg.solve(A,B)
    print("solution: ", C)
    ax.scatter([C[0]], [C[1]], [C[2]], c='C2', zdir='z')

    plt.show()

# }}}

main()

