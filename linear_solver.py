from scipy.optimize import fsolve

# solver instead of the matrices

def f(x):# {{{
    #  x  - y  + 4z = 0
    #  x  + 3y + 4z = 30
    #  4x + y  - z  = -50
    f0=     x[0] -     x[1] + 4 * x[2]
    f1=     x[0] + 3 * x[1] + 4 * x[2] - 30
    f2= 4 * x[0] +     x[1] -     x[2] + 50
    return [f0,f1,f2]
# }}}

print(fsolve(f,[0,0,0]))
