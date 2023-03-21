/* eslint-disable unused-imports/no-unused-vars */

interface ServerToClientEvents {
  updateMessages: (message: string) => void;
}

interface ClientToServerEvents {
  sendMessage: (message: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
