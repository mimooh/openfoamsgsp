from collections import OrderedDict
from math import sqrt, sin, cos, asin, acos, pi, degrees
from numpy.random import randint
import matplotlib.pyplot as plt
import inspect
import itertools
import json
import numpy as np
import os
import sys

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
        self.rings0={}
        self.num_frames=20
        self.v_scaler=0.1
        self.init_frames()
        self.speed=1
        self.times=np.arange(1,3,0.01)
        for r in range(1,2):
            self.rings0[r]=[]
            self.init_ring(r)
            self.ring_frames(r)
        #dd(self.frames[0])
# }}}
    def init_frames(self):# {{{
        self.frames={}
        for i in range(self.num_frames):
            self.frames[i]=[]
        
# }}}
    def velocity(self, x, r):# {{{
        alpha=acos(max(1,x)/r)
        return [ self.v_scaler * sin(alpha), self.v_scaler * cos(alpha) ]
# }}}
    def ring_frames(self, r):# {{{
        #self.frames[0].append({r: self.rings0[r]})
        frames=[]
        current=self.rings0[r]
        frames.append(current)
        for i in range(1,self.num_frames):
            create_frame=[]
            for x,y in current:
                v=self.velocity(x,r)
                #create_frame.append((x+v[0], y+v[1]))
                create_frame.append((x, y))
            current=create_frame
            print(i, create_frame[0])
            #frames.append(current)
            #alpha=self.xy2alpha(i[0],r)
            #v=[sin(alpha), cos(alpha)]
            #print("alpha:{}, vx:{}, vy:{}".format(round(degrees(alpha)), v[0], v[1]))
        #dd(frames)
    # }}}
    def init_ring(self, r):# {{{
        count=r*50
        x=[]
        y=[]
        for i in range(count):
            alpha=i*2*pi/count
            self.rings0[r].append((r*cos(alpha), r*sin(alpha)))
        #dd(self.rings[r])
        #p=list(zip(*self.rings[r][0]))
        #plt.scatter(p[0], p[1])
        #plt.show()

        
# }}}

dd=Dump
j=Json()
Gen()

