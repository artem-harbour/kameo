import './assets/styles/main.css';
import '@kameo/core/themes/light.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { baseForm } from './scripts/forms/baseForm.js';

const initKameo = () => {
  return new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [StarterKit],
    // content: '<p>Kameo World!</p>',
    content: baseForm,
    documentMode: 'builder',
  });
};

let kameo = initKameo();

// kameo.setDocumentMode('render');

// kameo.commands.insertFormInputText(0, {
//   id: 'test',
//   name: 'test',
//   value: 'Test value',
// });
