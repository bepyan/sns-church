import ConnectingStatus from '../components/connecting-status';
import CurrentMessage from '../components/current-message';
import TranslatedMessage from '../components/translated-message';

export default function cn() {
  return (
    <div class='container p-5'>
      <ConnectingStatus />
      <CurrentMessage />
      <TranslatedMessage class='mt-4' />
    </div>
  );
}
