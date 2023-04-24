import { createSignal } from 'solid-js';

export const [isSocketConnected, setIsSocketConnected] = createSignal(false);

export const [isBroadCastMode, setIsBroadCastMode] = createSignal(false);
export const [isRecognizing, setIsRecognizing] = createSignal(false);

export const [currentMessage, setCurrentMessage] = createSignal('');
export const [currentTranslatedMessage, setCurrentTranslatedMessage] = createSignal('');
export const [messageList, setMessageList] = createSignal([]);

export const addMassage = (message) => setMessageList((prev) => [message, ...prev]);
