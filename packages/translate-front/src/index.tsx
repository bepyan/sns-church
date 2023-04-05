import './index.css';
import 'virtual:windi.css';
import { Route, Router, Routes } from '@solidjs/router';
import { render } from 'solid-js/web';

import cn from './pages/cn';
import top from './pages/top';

render(
  () => (
    <Router>
      <Routes>
        <Route path='/' component={top} />
        <Route path='/cn' component={cn} />
      </Routes>
    </Router>
  ),
  document.getElementById('root'),
);
