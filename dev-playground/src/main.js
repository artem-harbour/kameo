import './assets/styles/main.css';
import '@kameo/core/style/prosemirror.css';
import '@kameo/core/style/main.css';
import { initKameo } from './scripts/index.js';

initKameo({
  element: document.querySelector('#kameo'),
});
