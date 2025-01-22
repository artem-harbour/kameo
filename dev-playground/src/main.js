import './assets/styles/main.css';
import '@kameo/core/style/main.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { baseForm } from './scripts/forms/baseForm.js';

const initKameo = () => {
  return new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [StarterKit],
    content: baseForm,
    documentMode: 'edit',
  });
};

let kameo = initKameo();

// kameo.setDocumentMode('view');

// kameo.commands.insertFormInputText(0, {
//   id: 'test',
//   name: 'test',
//   value: 'Test value',
// });
