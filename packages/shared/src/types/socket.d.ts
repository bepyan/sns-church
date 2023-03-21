/* eslint-disable unused-imports/no-unused-vars */

export interface ServerToClientEvents {
  updateMessages: (message: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
