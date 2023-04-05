import { messageList } from '../libs/states';

export default function TranslatedMessage(props) {
  return (
    <div {...props}>
      {messageList().map((message) => (
        <pre class='whitespace-pre-wrap'>{message}</pre>
      ))}
    </div>
  );
}
