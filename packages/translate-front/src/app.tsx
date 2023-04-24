import BroadcastForm from './components/broadcast-form';
import BroadcastMike from './components/broadcast-mike';
import BroadcastToggle from './components/broadcast-toggle';
import ConnectingStatus from './components/connecting-status';
import CurrentMessageBox from './components/current-message-box';
import TranslatedMessage from './components/translated-message';
import { isBroadCastMode } from './libs/states';

export default function App() {
  return (
    <div class='container p-4'>
      <div class='flex items-center justify-between'>
        <ConnectingStatus />
        <BroadcastToggle />
      </div>

      <h1 class='font-bold text-center py-5 text-2xl'>서나섬 실시간 통역</h1>

      {isBroadCastMode() && (
        <>
          <BroadcastMike />
          <div class='my-2'>
            <BroadcastForm />
          </div>
        </>
      )}

      <CurrentMessageBox />
      <TranslatedMessage class='mt-4' />
    </div>
  );
}
