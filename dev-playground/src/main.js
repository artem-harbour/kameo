import '@kameo/core/style/main.css';
import './assets/styles/main.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { formFields } from '@kameo/toolbar-form-fields';

const documentMode = 'edit';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [StarterKit],
    documentMode,
  });
  return kameo;
};

const createToolbar = () => {
  const container = document.querySelector('#kameo-toolbar');
  const toolbar = document.createElement('km-toolbar-form-fields');
  toolbar.classList.add('kameo-toolbar');
  toolbar.fields = formFields;
  container.append(toolbar);
};

const createBaseForm = (kameo) => {
  const pos = kameo.state.doc.content.size;
  kameo
    .chain()
    .insertContentAt(pos, '<h1>Simple form</h1>')
    .insertFormInputName(pos)
    .insertFormInputEmail(pos)
    .insertFormInputText(pos)
    .insertFormSubmit(pos)
    .run();
};

const handleDocumentMode = (kameo) => {
  const select = document.querySelector('.document-mode select');
  if (select) {
    select.value = documentMode;
    select.addEventListener('change', (event) => {
      kameo.setDocumentMode(event.target.value);
    });
  }
};

const handleBaseForm = (kameo) => {
  const button = document.querySelector('.base-form button');
  button?.addEventListener('click', (event) => {
    createBaseForm(kameo);
  });
};

const handleExportForm = (kameo) => {
  const button = document.querySelector('.export-form button');
  button?.addEventListener('click', (event) => {
    console.log('Export form');
  });
};

const handleImportForm = (kameo) => {
  const button = document.querySelector('.import-form button');
  button?.addEventListener('click', (event) => {
    console.log('Import form');
  });
};

const attachEvents = (kameo) => {
  handleBaseForm(kameo);
  handleDocumentMode(kameo);
  handleExportForm();
  handleImportForm();

  // example: override original submit method.
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
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  createToolbar();
  attachEvents(kameo);
};

init();
