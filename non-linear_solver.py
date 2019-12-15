from scipy.optimize import fsolve
import numpy as np
import matplotlib.pyplot as plt

def f(x):# {{{
    #  x^2 + y^2 = 25
    #  y = 2*x + 5
    f0=     x[0]**2 + x[1]**2 - 25
    f1=     x[0]*2  - x[1]    + 5
    return [f0,f1]
# }}}
def main():# {{{
    N=10
    x=np.linspace(-N,N)
    y=np.linspace(-N,N)
    X,Y=np.meshgrid(x,y)
    res=np.round(fsolve(f,[-100,100]))

    Z0 = X**2 + Y**2 - 25
    Z1 = x*2 + 5
    plt.contour(X,Y,Z0,[0])
    plt.plot(x,Z1)
    plt.plot([res[0]], [res[1]], marker='o', markersize=10, color="red")
    plt.show()
# }}}

main()
