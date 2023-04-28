import socket from './socket';
import { setIsRecognizing } from './states';
import translate from './translate';

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'ko-KR';

recognition.onstart = function () {
  setIsRecognizing(true);
};

recognition.onresult = function (event) {
  let interimTranscript = '';
  let finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    const result = event.results[i];
    const transcript = result[0].transcript;

    if (result.isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  socket.emit('sendCurrentMessage', interimTranscript);

  if (finalTranscript) {
    translate(finalTranscript, (text) => {
      socket.emit('sendMessage', text);
      socket.emit('sendCurrentTranslatedMessage', '');
    });
  } else {
    if (interimTranscript.endsWith('니다')) {
      translate(interimTranscript, (text) => {
        socket.emit('sendCurrentTranslatedMessage', text);
      });
    }
  }
};

recognition.onerror = function (event) {
  setIsRecognizing(false);
  console.log(event.error);
};

recognition.onend = function () {
  setIsRecognizing(false);
  console.log('Speech recognition ended');
};

export default recognition;
