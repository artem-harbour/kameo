import './assets/styles/main.css';
import '@kameo/core/style/main.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { baseForm } from './scripts/forms/baseForm.js';
import { ToolbarFormFields, formFields } from '@kameo/toolbar-form-fields';

const documentMode = 'edit';
const documentModeElem = document.querySelector('.kameo-app__document-mode select');

const initKameo = () => {
  return new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [StarterKit],
    // content: baseForm,
    documentMode,
    onSubmit: async (event) => {
      // console.log('onSubmit callback', { event });
    },
  });
};

const initToolbar = () => {
  const content = document.querySelector('.kameo-app__content');
  const toolbar = document.createElement('km-toolbar-form-fields');
  toolbar.classList.add('kameo-toolbar');
  toolbar.fields = formFields;
  content.prepend(toolbar);
};

const handleDocumentMode = (kameo) => {
  if (documentModeElem) documentModeElem.value = documentMode;
  documentModeElem?.addEventListener('change', (event) => {
    kameo.setDocumentMode(event.target.value);
  });
};

const createSimpleForm = (kameo) => {
  const pos = kameo.state.doc.content.size;

  kameo
    .chain()
    .insertContentAt(pos, 'Simple form')
    .insertFormInputName(pos)
    .insertFormInputEmail(pos)
    .insertFormInputText(pos)
    .insertFormSubmit(pos)
    .run();
};

const kameo = initKameo(); 
window.kameo = kameo;

initToolbar();
createSimpleForm(kameo);
handleDocumentMode(kameo);

// Example: override submit method.
const originalSubmit = kameo.submit;
kameo.submit = function(props = {}, options = {}) {
  const customProps = { ...props, customSubmit: true };
  return originalSubmit.apply(this, [customProps, options]);
};

kameo.on('submit', async (event) => {
  console.log(`on 'submit' event`, { event });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  event.setSubmitResult(true, 'Form is submitted');
});

kameo.on('submitted', (event) => {
  console.log(`on 'submitted' event`, { event });
});

// kameo
//   .onNodeEvent('formInputText', 'input', (props) => console.log({ props }))
//   .onNodeEvent('formInputName', 'input', (props) => console.log({ props }))
//   .onNodeEvent('formInputEmail', 'focus', (props) => console.log({ props }))
//   .onNodeEvent('formSubmit', 'click', (props) => console.log({ props }));
