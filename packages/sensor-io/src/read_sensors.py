import time
import random

def read_sensors(publish_record):
    while True:
        publish_record(' '.join([str(int(round(time.time(), 0))), str(round(random.random() * 10, 2)), str(round(random.random() * 10, 2))]))
        time.sleep(2)
