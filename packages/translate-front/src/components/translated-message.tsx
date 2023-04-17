import { JSX } from 'solid-js/jsx-runtime';

import { messageList } from '../libs/states';

export default function TranslatedMessage(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      {messageList().map((message) => (
        <pre class='whitespace-pre-wrap'>{message}</pre>
      ))}
    </div>
  );
}
