import { Component } from 'solid-js';

import recognition from './libs/recognition';
import socket from './libs/socket';
import { isRecognizing, isSocketConnected, messageList } from './libs/states';

const App: Component = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;

    socket.emit('sendMessage', e.target.text.value);
    e.target.text.value = '';
  };

  return (
    <div class='container p-5'>
      {isSocketConnected() ? (
        <span class='flex gap-1 items-center'>
          연결됨
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            class='h-5 w-5'
          >
            <path
              fill-rule='evenodd'
              d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
              clip-rule='evenodd'
            />
          </svg>
        </span>
      ) : (
        <span>연결중...</span>
      )}

      <h1 class='font-bold text-center py-10 text-2xl'>서나섬 실시간 통역</h1>

      <div class='flex items-center justify-center'>
        <button onClick={() => recognition.start()}>
          {isRecognizing() ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              class='h-10 w-10'
            >
              <path d='M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z' />
              <path d='M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='h-10 w-10'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
              />
            </svg>
          )}
        </button>
      </div>

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
