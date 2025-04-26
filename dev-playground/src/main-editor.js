import '@kameo/core/style/theme.css';
import './assets/styles/main-editor.css';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { TextStyle } from '@kameo/extension-text-style';
import { FontFamily } from '@kameo/extension-font-family';
import { Color } from '@kameo/extension-color';
import { Image } from '@kameo/extension-image';
import { ToolbarFormFields, formFields } from '@kameo/toolbar-form-fields';
import { createToolbar } from './helpers/createToolbar.js';
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
      TextStyle,
      FontFamily,
      Color,
      Image,
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

  createToolbar({ fields: formFields });
  attachEvents(kameo);
};

init();
