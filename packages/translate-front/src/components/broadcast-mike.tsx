import recognition from '../libs/recognition';
import { isRecognizing } from '../libs/states';

export default function BroadcastMike() {
  const toggleRecognition = () => {
    if (isRecognizing()) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div class='flex items-center justify-center'>
      <button
        onClick={toggleRecognition}
        class='transition-colors hover:opacity-90 active:opacity-50'
      >
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
  );
}
