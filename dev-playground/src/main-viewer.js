import '@kameo/core/style/theme.css';
import './assets/styles/main-viewer.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import { Image } from '@kameo/extension-image';
import { handleBaseForm } from './helpers/handleBaseForm.js';
import { handleImportForm } from './helpers/handleImportForm.js';
import { handleClearContent } from './helpers/handleClearContent.js';
import baseForm from './forms/base-form.json';

const documentMode = 'view';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      FormKit,
      TextStyleKit,
      Image,
    ],
    content: baseForm,
    documentMode,
  });
  return kameo;
};

const listenKameoEvents = (kameo) => {
  kameo.on('submit', async (event) => {
    console.log(`on 'submit' event`, { event });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    event.setSubmitResult({
      success: true,
      message: 'Form is submitted',
    });
  });

  kameo.on('submitted', (event) => {
    console.log(`on 'submitted' event`, { event });

    const data = Object.fromEntries(
      [...event.formData].map(([key, data]) => [key, data.value])
    );

    window.alert(`${event.message} \n ${JSON.stringify(data)}`);
    window.location.reload();
  });
};

const attachEvents = (kameo) => {
  handleBaseForm(kameo);
  handleImportForm(kameo);
  handleClearContent(kameo);
  listenKameoEvents(kameo);
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  attachEvents(kameo);
};

init();
