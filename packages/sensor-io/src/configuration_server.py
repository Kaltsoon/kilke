import cgi
import thread
import json
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

def make_configuration_handler(publish):
    class ConfigurationHandler(BaseHTTPRequestHandler):
        def do_POST(self):
            content_type, dictinary = cgi.parse_header(self.headers.getheader('content-type'))

            if content_type == 'application/json':
                try:
                    length = int(self.headers.getheader('content-length'))
                    publish(json.loads(self.rfile.read(length)))

                    self.send_response(200)
                except Exception, e:
                    print(e)
                    self.send_response(500)
            else:
                self.send_response(400)

            self.end_headers()
    
    return ConfigurationHandler

class ConfigurationServer():
    def __init__(self, port):
        self.port = port
        self.subscriptions = []

    def unsubscribe(self, callback):
        self.subscriptions.remove(callback)

    def subscribe(self, callback):
        self.subscriptions.append(callback)

        unsubscribe = lambda: self.unsubscribe(callback)

        return unsubscribe

    def publish(self, message):
        for subscription in self.subscriptions:
            subscription(message)

    def handle(self, publish, port):
        handler = make_configuration_handler(self.publish)
        server = HTTPServer(('', port), handler)
        server.serve_forever()
    
    def run(self):
        thread.start_new_thread(self.handle, (self.publish, self.port))