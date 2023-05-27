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
    return;
  }

  if (
    interimTranscript.endsWith('니다') ||
    interimTranscript.endsWith('시다') ||
    interimTranscript.endsWith('시고') ||
    interimTranscript.endsWith('이라') ||
    interimTranscript.endsWith('되죠') ||
    interimTranscript.endsWith('나요') ||
    interimTranscript.endsWith('데요') ||
    interimTranscript.endsWith('세요') ||
    interimTranscript.endsWith('지만') ||
    interimTranscript.endsWith('하거든요') ||
    interimTranscript.endsWith('겠죠') ||
    interimTranscript.endsWith('어요') ||
    interimTranscript.endsWith('아요') ||
    interimTranscript.endsWith('소서')
  ) {
    translate(interimTranscript, (text) => {
      socket.emit('sendCurrentTranslatedMessage', text);
    });
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
