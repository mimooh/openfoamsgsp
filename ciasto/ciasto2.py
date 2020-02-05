from collections import OrderedDict
import math
from math import sin, cos
from copy import deepcopy
from numpy.random import randint
import inspect
import itertools
import json
import numpy as np
import os
import sys
from numpy.random import uniform

class Dump:# {{{
    def __init__(self,*args):
        '''debugging function, much like print but handles various types better'''
        print()
        for struct in args:
            if isinstance(struct, list):
                for i in struct:
                    print(i)
            elif isinstance(struct, tuple):
                for i in struct:
                    print(i)
            elif isinstance(struct, dict):
                for k, v in struct.items():
                    print (str(k)+':', v)
            else:
                print(struct)
# }}}
class Json: # {{{
    def readdb(self,table):
        if not hasattr(self, 's'):
            self.s=Sqlite("{}/aamks.sqlite".format(os.environ['AAMKS_PROJECT']))
        return json.loads(self.s.query("SELECT json FROM {}".format(table))[0]['json'])
    def read(self,path): 
        try:
            f=open(path, 'r')
            dump=json.load(f, object_pairs_hook=OrderedDict)
            f.close()
            return dump
        except:
            raise SystemExit("include.py: Missing or invalid json: {}.".format(path)) 

    def write(self, data, path, pretty=0): 
        try:
            if pretty==1:
                pretty=json.dumps(data, indent=4)
                with open(path, "w") as f: 
                    json.dump(pretty, f)
            else:
                with open(path, "w") as f: 
                    json.dump(data, f)
        except:
            raise SystemExit("include.py: Cannot write json: {}.".format(path)) 


# }}}

class Gen:
    def __init__(self):# {{{
        self.len_frames=100
        self.init_frame0()
        #self.plot();
        self.add_frames()
# }}}
    def plot(self):# {{{
        import matplotlib.pyplot as plt
        dots=[ [], [] ]
        for p in self.frame0:
            dots[0].append(p['x'])
            dots[1].append(p['y'])
        plt.scatter(dots[0], dots[1])
        plt.show()
        
# }}}
    def init_frame0(self):# {{{
        self.frame0=[]
        r=1
        for i in range(500):
            x=uniform(-r,r)
            y=uniform(-r,r)
            if((x**2 + y**2)**0.5 < r ):
                self.frame0.append({ 'x': x, 'y': y, 'z': uniform(-0.3,0.3) })
# }}}
    def add_frames(self):# {{{
        t=2
        dt=0.05
        out=[]
        current=self.frame0
        for i in range(self.len_frames):
            new=[]
            for p in current:
                x,y,z=p['x'], p['y'], p['z']
                new.append(
                {
                    'x': x + -y * dt  / ( 0.5*t * (x**2 + y**2)**0.9) ,
                    'y': y +  x * dt  / ( 0.5*t * (x**2 + y**2)**0.9) ,
                    'z': uniform(0.1,0.2)
                })

                # new.append(
                # {
                #     'x': (-x * (y**2 + z**2)**0.5) / (t*(x**2 + y**2 + z**2)**0.5) ,
                #     'y': ( y * (x**2 + z**2)**0.5) / (t*(x**2 + y**2 + z**2)**0.5) , 
                #     'z': 0
                # })
                # new.append(
                #  {
                #      'x': x+dt,
                #      'y': math.sin(2*x),
                #      'z': 0
                #  })
            current=new
            out.append(current)
            t+=dt
        j.write(out, "ciasto.json")
    # }}}

        
# }}}

dd=Dump
j=Json()
Gen()
# ciasto.json
