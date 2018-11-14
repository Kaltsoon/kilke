import thread
import socket
import json

class RecordServer:
    def __init__(self, port):
        self.port = port
        self.client_sockets = []

    def handle(self, client_sockets, port):
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.bind(('', port))
        server_socket.listen(5)

        while True:
            client_socket, addr = server_socket.accept()
            client_sockets.append(client_socket)

    def run(self):
        thread.start_new_thread(self.handle, (self.client_sockets, self.port))

    def send_to_sockets(self, message):
        for socket in self.client_sockets:
            try:
                socket.send(json.dumps(message))
            except:
                # Socket is likely closed, at it can be removed
                self.client_sockets.remove(socket)
