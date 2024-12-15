import './assets/css/main.css';
import { Kameo, kExtensions } from '@kameo/core';

new Kameo({
  element: document.querySelector('#app'),
  extensions: [
    ...Object.values(kExtensions),
  ],
  content: '<p>Kameo World!</p>',
})
