import BroadcastForm from './components/broadcast-form';
import BroadcastMike from './components/broadcast-mike';
import ConnectingStatus from './components/connecting-status';
import CurrentMessage from './components/current-message';
import TranslatedMessage from './components/translated-message';

export default function App() {
  return (
    <div class='container p-5'>
      <ConnectingStatus />

      <h1 class='font-bold text-center py-10 text-2xl'>서나섬 실시간 통역</h1>

      <BroadcastMike />
      <div class='my-2'>
        <BroadcastForm />
      </div>

      <CurrentMessage />
      <TranslatedMessage class='mt-4' />
    </div>
  );
}
