import '@kameo/core/style/theme.css';
import './assets/styles/main.css';

import { Kameo, kameoHelpers } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import { Image } from '@kameo/extension-image';
import { SlashCommand, suggestion } from '@kameo/extension-slash-command';
import { Placeholder } from '@kameo/extensions';
// import { ToolbarFormFields, formFields } from '@kameo/toolbar-form-fields';
// import { createToolbar } from './helpers/createToolbar.js';
import { handleBaseForm } from './helpers/handleBaseForm.js';
import { handleDocumentMode } from './helpers/handleDocumentMode.js';
import { handleImportForm } from './helpers/handleImportForm.js';
import { handleExportForm } from './helpers/handleExportForm.js';
import { handleClearContent } from './helpers/handleClearContent.js';
import baseForm from './forms/base-form.json';

const documentMode = 'edit';

const initKameo = () => {
  const kameo = new Kameo({
    element: document.querySelector('#kameo'),
    extensions: [
      StarterKit,
      FormKit,
      TextStyleKit,
      Image,
      SlashCommand.configure({ suggestion }),
      Placeholder.configure({ placeholder: 'Press / for commands...' }),
    ],
    documentMode,

    // Override default handlers.
    // handlers: {
    //   async submit(props = {}) {
    //     const formData = kameoHelpers.getFormData(this.state);
    //     await new Promise((resolve) => setTimeout(resolve, 3000));
    //     this.emit('submitted', {
    //       formData,
    //       success: true,
    //       message: 'Form is submitted',
    //       props: { ...props, custom: true },
    //     });
    //   },
    // },

    // Uncomment for faster development/testing.
    // content: baseForm,
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
  });

  // kameo.onNodeEvent('formInputText', 'input', (props) => console.log({ props }));
};

const attachEvents = (kameo) => {
  handleBaseForm(kameo);
  handleDocumentMode(kameo, documentMode);
  handleExportForm(kameo);
  handleImportForm(kameo);
  handleClearContent(kameo);
  listenKameoEvents(kameo);
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  // createToolbar({ fields: formFields });
  attachEvents(kameo);
};

init();
