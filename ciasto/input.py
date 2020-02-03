from collections import OrderedDict
import math
from copy import deepcopy
#from math import sqrt, sin, cos, asin, acos, atan, pi, degrees
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
        self.rings={}
        self.num_frames=10
        for r in range(1,4):
            self.rings[r]=self.make_polygon(r)
        self.ring_frames()
        #self.plot_rings()
# }}}
    def plot_rings(self):# {{{
        dots=[ [], [] ]
        for r,v in self.rings.items():
            for i in v:
                dots[0].append(i[0])
                dots[1].append(i[1])
        plt.scatter(dots[0], dots[1])
        plt.show()
        
# }}}
    def make_polygon(self,radius):# {{{
        sides=radius*30
        one_segment = math.pi * 2 / sides
        points = [
            (math.sin(one_segment * i) * radius,
             math.cos(one_segment * i) * radius)
            for i in range(sides)]
        return points
# }}}
    def ring_frames(self):# {{{
        self.frames=[]
        for frame in range(1,self.num_frames):
            frame_record={}
            for r in self.rings.keys(): 
                try:
                    new=deepcopy(self.frames[frame-2][r])
                except:
                    new=deepcopy(self.rings[r])
                first=new.pop(0)
                new.append(first)
                frame_record[r]=new
            self.frames.append(frame_record)

        flat=[]
        for f in self.frames:
            record=[]
            for m,n in f.items():
                record+=n
            flat.append(record)

        j.write(flat, "ciasto.json")
    # }}}
        
# }}}

dd=Dump
j=Json()
Gen()
# ciasto.json
