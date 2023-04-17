import socket from '../libs/socket';

export default function BroadcastForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.text.value) return;

    socket.emit('sendMessage', e.target.text.value);
    e.target.text.value = '';
  };

  return (
    <form class='flex' onSubmit={handleSubmit}>
      <textarea
        id='text'
        class='bg-transparent border-b border-gray-300 flex-1 py-2 px-4 placeholder:text-neutral-400 focus:outline-none'
        placeholder='메시지를 입력하세요...'
      />
      <button class='font-bold py-2 px-4' type='submit'>
        전송
      </button>
    </form>
  );
}
