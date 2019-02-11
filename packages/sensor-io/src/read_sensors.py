import time
import random

def read_sensors(publish_record, config):
    while True:
        publish_record({
            'time': int(round(time.time(), 0)),
            'cond': round(random.random() * 10, 2),
            'tco': round(random.random() * 10, 2),
            'phd': round(random.random() * 10, 2),
            'phf': round(random.random() * 10, 2),
            'wd': round(random.random() * 10, 2),
            'wf': round(random.random() * 10, 2),
            'tamb': round(random.random() * 10, 2)
        })
        
        time.sleep(2)
