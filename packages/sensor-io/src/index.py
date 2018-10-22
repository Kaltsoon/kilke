from record_server import RecordServer
from read_sensors import read_sensors
import os

if __name__ == "__main__":
    port = 4000

    try:
        port = int(os.environ["RECORD_SERVER_PORT"])
    except:
        pass

    record_server = RecordServer(port)
    record_server.run()

    read_sensors(record_server.send_to_sockets)
