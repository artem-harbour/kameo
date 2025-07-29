import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@kameo/core/style/theme.css';
import './assets/styles/main.css';

import '@kameo/core/webawesome.js';
import { Kameo, kameoHelpers } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import { Image } from '@kameo/extension-image';
import { SlashCommand, suggestion } from '@kameo/extension-slash-command';
import { Placeholder } from '@kameo/extensions';
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
      FormKit.configure({
        formTextarea: {
          customValidator: ({ node }) => {
            if (!node.attrs.value) return 'Hey, where is the value?';
            return '';
          },
        },
      }),
      TextStyleKit,
      Image,
      SlashCommand.configure({ suggestion }),
      Placeholder.configure({ placeholder: 'Press / for commands...' }),
    ],
    documentMode,

    // validationOptions: {
    //   customValidator: ({ node, element }) => {
    //     if (node.type.name === 'formInput' && !node.attrs.value) {
    //       return 'No value.';
    //     }
    //     return '';
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

    if (!event.valid) {
      event.setResult({
        success: false,
        message: 'Form is not valid',
      });
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));
    event.setResult({
      success: true,
      message: 'Form is submitted',
    });
  });

  kameo.on('submit:result', (event) => {
    console.log(`on 'submit:result' event`, { event });
  });

  // kameo.on('update', ({ transaction }) => {
  //   const meta = transaction.getMeta('formElementUpdate');
  //   if (meta) {
  //     const { nodeView } = meta;
  //     console.log(nodeView.node);
  //   }
  // });
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

  attachEvents(kameo);
};

init();
