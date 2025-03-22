import '@kameo/core/style/theme.css';
import './assets/styles/main.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { TextStyle } from '@kameo/extension-text-style';
import { FontFamily } from '@kameo/extension-font-family';
import { Color } from '@kameo/extension-color';
import { Image } from '@kameo/extension-image';
import { formFields } from '@kameo/toolbar-form-fields';
import { createToolbar } from './helpers/createToolbar.js';
import { createBaseForm } from './helpers/createBaseForm.js';
import { createDownload } from './helpers/createDownload.js';
import { getFileOpener } from './helpers/getFileOpener.js';

const documentMode = 'edit';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Color,
      Image,
    ],
    documentMode,
  });
  return kameo;
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
    const jsonStr = JSON.stringify(kameo.getJSON());
    const blob = new Blob([jsonStr], { type: 'application/json' });
    createDownload({
      name: 'exported-form',
      extension: 'json',
      blob,
    });
  });
};

const handleImportForm = (kameo) => {
  const button = document.querySelector('.import-form button');
  button?.addEventListener('click', async (event) => {
    const open = getFileOpener();
    const result = await open();
    if (!result) return;
    try {
      const doc = JSON.parse(result.text);
      kameo.commands.setContent(doc);
    } catch (err) {
      console.error(err);
    }
  });
};

const listenKameoEvents = () => {
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

const attachEvents = (kameo) => {
  handleBaseForm(kameo);
  handleDocumentMode(kameo);
  handleExportForm(kameo);
  handleImportForm(kameo);
  listenKameoEvents();
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  createToolbar({ fields: formFields });
  attachEvents(kameo);
};

init();
