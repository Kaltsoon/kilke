import time
import random

def configurate_pump(command, config, on_ack, on_error):
      if random.random() < 0.2:
            on_error()
      else:
            rpm = round(random.random() * 100)
            print(rpm)
            on_ack(rpm)