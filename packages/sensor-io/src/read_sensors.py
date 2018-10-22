import time

def read_sensors(publish_record):
    while True:
        publish_record(' '.join([str(int(round(time.time(), 0))), str(1), str(2)]))
        time.sleep(1)
