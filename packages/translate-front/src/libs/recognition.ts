import socket from './socket';
import { setIsRecognizing } from './states';
import translate from './translate';

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'ko-KR';
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function () {
  setIsRecognizing(true);
};

recognition.onresult = function (event) {
  let interimTranscript = '';
  let finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript;
    } else {
      interimTranscript += event.results[i][0].transcript;
    }
  }

  socket.emit('sendCurrentMessage', interimTranscript);

  if (finalTranscript) {
    translate(finalTranscript, (text) => {
      socket.emit('sendMessage', text);
    });
  }
};

recognition.onerror = function (event) {
  console.log(event.error);
};

recognition.onend = function () {
  setIsRecognizing(false);
  console.log('Speech recognition ended');
};

export default recognition;
