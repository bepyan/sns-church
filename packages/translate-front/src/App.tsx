import { ClientToServerEvents, ServerToClientEvents } from '@sns/shared';
import { io, Socket } from 'socket.io-client';
import { Component, createSignal } from 'solid-js';

// state
const [connected, setConnected] = createSignal(false);
const [messageList, setMessageList] = createSignal([]);

// socket
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:8000');

socket.on('connect', () => {
  console.log('SOCKET CONNECTED!', socket.id);
  setConnected(true);
});

socket.on('updateMessages', (message) => {
  console.log('updateMessages', message);

  setMessageList((prev) => [message, ...prev]);
});

socket.on('connect_error', () => {
  console.log('SOCKET CONNECT ERROR!', socket.id);
  setTimeout(() => {
    socket.connect();
  }, 1000);
});

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});

const App: Component = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;

    socket.emit('sendMessage', e.target.text.value);
    e.target.text.value = '';
  };

  return (
    <div class='container p-5'>
      {connected() ? '연결됨 ✅' : '연결중...'}

      <h1 class='font-bold text-center py-10 text-2xl'>서나섬 실시간 통역</h1>

      <form class='flex my-2' onSubmit={handleSubmit}>
        <input
          id='text'
          class='bg-transparent border-b border-gray-300 flex-1 py-2 px-4 placeholder:text-neutral-400 focus:outline-none'
          type='text'
          placeholder='메시지를 입력하세요...'
        />
        <button class='font-bold py-2 px-4' type='submit'>
          전송
        </button>
      </form>

      <ul class='mt-4'>
        {messageList().map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
