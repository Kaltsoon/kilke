import time
import random

def read_sensors(publish_record):
    while True:
        publish_record([
            int(round(time.time(), 0)),
            round(random.random() * 10, 2),
            round(random.random() * 10, 2),
            round(random.random() * 10, 2),
            round(random.random() * 10, 2),
            round(random.random() * 10, 2),
            round(random.random() * 10, 2),
            round(random.random() * 10, 2)
        ])
        
        time.sleep(2)
