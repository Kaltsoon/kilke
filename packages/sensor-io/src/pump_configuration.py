import time
import random

def configurate_pump(command, config, on_ack, on_error):
      if random.random() < 0.5:
            on_error()