from record_server import RecordServer
from configuration_server import ConfigurationServer
from read_sensors import read_sensors
from pump_configuration import configurate_pump
import os
import json

config_file = open(os.path.join(os.path.dirname(__file__), '../../../config.json'), 'r');

CONFIG = json.loads(config_file.read())

def send_measurements(record_server, measurement_dic):
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

def send_pump_ack(record_server, pump_id, data):
    record_server.send_to_sockets({
        'type': 'pump_ack',
        'payload': {
            'pumpId': pump_id,
            'data': data
        }
    })

def handle_pump_configuration(record_server, command):
    on_error = lambda: send_pump_fault(record_server, command['id'])
    on_ack = lambda data: send_pump_ack(record_server, command['id'], data)
    configurate_pump(command, CONFIG, on_ack, on_error)

def handle_message(record_server, message):
    if message['type'] == 'pump_configuration':
        print(message['payload'])
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

    read_sensors(lambda measurement: send_measurements(record_server, measurement), CONFIG)
