from collections import OrderedDict
import math
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
        self.frames=[ [] for i in range(self.len_frames) ]
        for r in range(1,2):
            self.frames[0]+=self.make_polygon(r)
        self.add_frames()
# }}}
    def make_polygon(self,radius):# {{{
        sides=22 + radius*10
        #sides=5
        one_segment = math.pi * 2 / sides
        points = [ { 'x': math.sin(one_segment * i) * (1+0.1 * radius), 'y': math.cos(one_segment * i) * (1+0.1 * radius), 'z': 0 } for i in range(sides)]
        return points
# }}}
    def add_frames(self):# {{{
        # TODO: need to generate next data and read it
        for i,frame in enumerate(self.frames[:-1]):
            print(i)
            t = i / self.len_frames
            for p in frame:
                # new.append(
                #     ( 
                #         (-x * (y**2 + z**2)**0.5) / (t*(x**2 + y**2 + z**2)**0.5),
                #         ( y * (x**2 + z**2)**0.5) / (t*(x**2 + y**2 + z**2)**0.5),
                #         0
                #     )
                # )
                print(i+1)
                self.frames[i+1].append((p['x']+i/10, p['y']+0.1*math.sin(i), p['z']))
            print(self.frames)
        j.write(self.frames, "ciasto.json")
    # }}}
        
# }}}

dd=Dump
j=Json()
Gen()
# ciasto.json
