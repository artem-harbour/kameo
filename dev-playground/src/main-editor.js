import '@kameo/core/style/theme.css';
import './assets/styles/main-editor.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import { Image } from '@kameo/extension-image';
import { SlashCommand, suggestion } from '@kameo/extension-slash-command';
import { Placeholder } from '@kameo/extensions';
// import { ToolbarFormFields, formFields } from '@kameo/toolbar-form-fields';
// import { createToolbar } from './helpers/createToolbar.js';
import { handleBaseForm } from './helpers/handleBaseForm.js';
import { handleImportForm } from './helpers/handleImportForm.js';
import { handleExportForm } from './helpers/handleExportForm.js';
import { handleClearContent } from './helpers/handleClearContent.js';


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
  });
  return kameo;
};

const attachEvents = (kameo) => {
  handleBaseForm(kameo);
  handleExportForm(kameo);
  handleImportForm(kameo);
  handleClearContent(kameo);
};

const init = () => {
  const kameo = initKameo();
  window.kameo = kameo;

  // createToolbar({ fields: formFields });
  attachEvents(kameo);
};

init();
