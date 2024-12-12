import './style.css';
import { Kameo, kameoExtensions } from '@kameo/core';

new Kameo({
  element: document.querySelector('#app'),
  extensions: [
    ...Object.values(kameoExtensions),
  ],
  content: '<p>Kameo World!</p>',
})
