#include <unistd.h>
#include <stdio.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <netinet/in.h>
#include <string.h>
#include <pthread.h>

// Port for tcp connections
#define PORT 4000

int server_fd;
struct sockaddr_in address;
int addrlen = sizeof(address);
int max_sockets = 20; // Maximum number of connected clients
int socket_list[20]; // List of connected clients

// Send a message to every connected client
void send_to_sockets(char *message) {
  for (int i = 0; i < max_sockets; i++) {
    if (socket_list[i] != 0) {
      send(socket_list[i], message, strlen(message), 0);
    }
  }
}

// Accept client connection
void *accept_socket(void *vargp) {
  static int new_socket;
  static int socket_list_pointer = 0;

  while (1) {
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen)) < 0) {
      perror("accept");
    }

    int next_socket_list_pointer = (socket_list_pointer + 1) % max_sockets;

    if (socket_list[next_socket_list_pointer] != 0) {
      close(socket_list[next_socket_list_pointer]);
    }

    socket_list[socket_list_pointer] = new_socket;

    socket_list_pointer = next_socket_list_pointer;
  }
}

// Initialize tcp server
void create_server() {
  int opt = 1;

  if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
    perror("socket failed");
    exit(EXIT_FAILURE);
  }

  if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt))) {
    perror("setsockopt");
    exit(EXIT_FAILURE);
  }

  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons( PORT );

  if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0 ) {
    perror("bind failed");
    exit(EXIT_FAILURE);
  }

  if (listen(server_fd, 3) < 0) {
    perror("listen");
    exit(EXIT_FAILURE);
  }
}

void *read_sensors(void *vargp) {
  char *message = "1 2 3 4";

  while (1) {
    sleep(1);

    // Read sensors here
    send_to_sockets(message);
  }
}

int main() {
  create_server();

  pthread_t accept_socket_thread_id;
  pthread_t read_sensors_thread_id;

  // Thread for accepting client connections
  pthread_create(&accept_socket_thread_id, NULL, accept_socket, NULL);
  // Thread for reading the sensors
  pthread_create(&read_sensors_thread_id, NULL, read_sensors, NULL);

  pthread_join(accept_socket_thread_id, NULL);
  pthread_join(read_sensors_thread_id, NULL);

  return 0;
}
