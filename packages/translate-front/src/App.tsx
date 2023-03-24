import { Component } from 'solid-js';

import recognition from './libs/recognition';
import socket from './libs/socket';
import { currentMessage, isRecognizing, isSocketConnected, messageList } from './libs/states';

const App: Component = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;

    console.log(e.target.text.value);
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
        <textarea
          id='text'
          class='bg-transparent border-b border-gray-300 flex-1 py-2 px-4 placeholder:text-neutral-400 focus:outline-none'
          placeholder='메시지를 입력하세요...'
        />
        <button class='font-bold py-2 px-4' type='submit'>
          전송
        </button>
      </form>

      <div class='border-b border-dashed flex py-4 gap-2 items-start'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='flex-shrink-0 h-6 w-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z'
          />
        </svg>
        <span class='text-sm sm:(text-base)'>{currentMessage()}</span>
      </div>

      <div class='mt-4'>
        {messageList().map((message) => (
          <pre class='whitespace-pre-wrap'>{message}</pre>
        ))}
      </div>
    </div>
  );
};

export default App;
