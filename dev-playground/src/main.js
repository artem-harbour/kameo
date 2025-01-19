import './assets/styles/main.css';

import '@kameo/core/style/prosemirror.css';
import '@kameo/core/style/main.css';
import '@shoelace-style/shoelace/dist/themes/light.css';

import { Kameo } from '@kameo/core';
import { Document } from '@kameo/extension-document'; 
import { Text } from '@kameo/extension-text';
import { Paragraph } from '@kameo/extension-paragraph';
import { FormInputText } from '@kameo/extension-form-fields';
import { baseForm } from './scripts/forms/baseForm.js';

const initKameo = () => {
  return new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      Document,
      Text,
      Paragraph,
      FormInputText,
    ],
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
