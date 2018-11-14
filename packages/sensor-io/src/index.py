from record_server import RecordServer
from configuration_server import ConfigurationServer
from read_sensors import read_sensors
from pump_configuration import configurate_pump
import os

def send_measurements(record_server, measurement):
    measurement_dic = {
        'time': measurement[0],
        'cond': measurement[1],
        'tco': measurement[2],
        'phd': measurement[3],
        'phf': measurement[4],
        'wd': measurement[5],
        'wf': measurement[6],
        'tamb': measurement[7]
    }

    record_server.send_to_sockets({
        'type': 'measurement',
        'payload': measurement_dic
    })

def send_pump_fault(record_server, pump_id):
    record_server.send_to_sockets({
        'type': 'pump_fault',
        'payload': {
            'pumpId': pump_id
        }
    })

def handle_pump_configuration(record_server, configuration):
    on_error = lambda: send_pump_fault(record_server, configuration['id'])
    configurate_pump(configuration, on_error)

def handle_message(record_server, message):
    print message

    if message['type'] == 'pump_configuration':
        handle_pump_configuration(record_server, message['payload'])


if __name__ == "__main__":
    record_server_port = 4000
    configuration_server_port = 4001

    try:
        record_server_port = int(os.environ["RECORD_SERVER_PORT"])
        configuration_server_port = int(os.environ["CONFIGURATION_SERVER_PORT"])
    except:
        pass

    record_server = RecordServer(record_server_port)
    record_server.run()

    configuration_server = ConfigurationServer(configuration_server_port)
    configuration_server.run()

    configuration_server.subscribe(lambda message: handle_message(record_server, message))

    read_sensors(lambda measurement: send_measurements(record_server, measurement))
