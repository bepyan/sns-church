/* eslint-disable unused-imports/no-unused-vars */

type TMessage = {
  message: string;
  time: string;
};

export interface ServerToClientEvents {
  updateMessages: (props: TMessage) => void;
  updateCurrentMessage: (message: string) => void;
  updateCurrentTranslatedMessage: (message: string) => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: string) => void;
  sendCurrentMessage: (message: string) => void;
  sendCurrentTranslatedMessage: (message: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
