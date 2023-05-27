import { TMessage } from '@sns/shared';
import { createSignal } from 'solid-js';

export const [isSocketConnected, setIsSocketConnected] = createSignal(false);

export const [isBroadCastMode, setIsBroadCastMode] = createSignal(false);
export const [isRecognizing, setIsRecognizing] = createSignal(false);

export const [currentMessage, setCurrentMessage] = createSignal('');
export const [currentTranslatedMessage, setCurrentTranslatedMessage] = createSignal('');
export const [messageList, setMessageList] = createSignal<TMessage[]>([]);

export const addMassage = (message: TMessage) => setMessageList((prev) => [message, ...prev]);
