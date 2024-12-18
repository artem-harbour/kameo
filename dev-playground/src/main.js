import './assets/styles/main.css';
import '@kameo/core/style/prosemirror.css';
import '@kameo/core/style/main.css';
import { Kameo } from '@kameo/core';
import { Document } from '@kameo/extension-document'; 
import { Paragraph } from '@kameo/extension-paragraph'
import { Text } from '@kameo/extension-text'; 

const initKameo = () => {
  new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      Document,
      Text,
      Paragraph,
    ],
    content: '<p>Kameo World!</p>',
  });
};

initKameo();
