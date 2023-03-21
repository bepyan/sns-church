import type { Component } from 'solid-js';
import { helloWorld } from '@sns-church/shared';
const App: Component = () => {
  helloWorld();

  return <p class='text-center py-20 text-4xl text-green-700'>Hello windi-css!</p>;
};

export default App;
