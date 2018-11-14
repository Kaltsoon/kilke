import time
import random

def configurate_pump(configuration, on_error):
      if random.random() < 0.5:
            on_error()