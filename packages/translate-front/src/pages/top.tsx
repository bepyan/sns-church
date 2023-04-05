import ConnectingStatus from '../components/connecting-status';
import CurrentMessage from '../components/current-message';
import TranslatedMessage from '../components/translated-message';
import recognition from '../libs/recognition';
import socket from '../libs/socket';
import { isRecognizing } from '../libs/states';

export default function top() {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;

    console.log(e.target.text.value);
    socket.emit('sendMessage', e.target.text.value);
    e.target.text.value = '';
  };

  return (
    <div class='container p-5'>
      <ConnectingStatus />

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

      <CurrentMessage />
      <TranslatedMessage class='mt-4' />
    </div>
  );
}
