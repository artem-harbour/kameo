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
    onSubmit: async (event) => {
      // console.log('onSubmit callback', { event });
    },
  });
};

const kameo = initKameo(); 
window.kameo = kameo;

// Example: override submit method.
const originalSubmit = kameo.submit;
kameo.submit = function(props = {}) {
  const customProps = { ...props, customSubmit: true };
  return originalSubmit.apply(this, [customProps]);
}

kameo.on('submit', async (event) => {
  console.log(`on 'submit' event`, { event });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  event.setSubmitResult(true, 'Form is submitted');
});

kameo.on('submitted', (event) => {
  console.log(`on 'submitted' event`, { event });
});

// kameo.setDocumentMode('view');
