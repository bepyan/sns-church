import { JSX } from 'solid-js/jsx-runtime';

import { messageList } from '../libs/states';

export default function TranslatedMessage(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      {messageList().map(({ message, time }) => (
        <div class='my-2'>
          <span class='text-neutral-400'>{time}</span>
          <pre class='whitespace-pre-wrap'>{message}</pre>
        </div>
      ))}
    </div>
  );
}
