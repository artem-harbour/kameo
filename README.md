<p align="center">
  <a href="#" target="_blank">
    <img src="./assets//logo.svg?sanitize=true" width="180" height="180" alt="Kameo" />
  </a>
</p>

# Kameo

Kameo is a toolkit for creating and rendering interactive web forms within rich text content, based on ProseMirror.

## Screenshot

<p align="center">
  <img src="./assets//screenshot.webp" width="600px" alt="Kameo screenshot" />
</p>

## Features
- **Create and render web forms** - Build dynamic forms with an intuitive interface
- **Import/export forms** - Save and load forms as JSON
- **Dynamic form creation** - Build forms programmatically with commands
- **Rich text editing capabilities** - Can be used as a rich text editor
- **Extensible and customizable** - Create your own custom extensions and form fields
- **Framework agnostic** - Works seamlessly across different frontend frameworks
- **More to come** - The project is actively evolving with new features on the way

## Installation

TODO

## Quick start

```javascript
import '@kameo/core/style/theme.css';
import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { TextStyleKit } from '@kameo/extension-text-style';
import { ToolbarFormFields, formFields } from '@kameo/toolbar-form-fields';

const kameo = new Kameo({
  element: document.querySelector('#kameo'),
  extensions: [
    StarterKit,
    FormKit,
    TextStyleKit,
  ],
  documentMode: 'edit',
});

kameo.on('submit', async (event) => {
  event.setSubmitResult({
    success: true,
    message: 'Form is submitted',
  });
});

kameo.on('submitted', (event) => {
  console.log(`on 'submitted' event`, { 
    event,
    formData: event.formData,
  });
});

// Create toolbar with fields.
const toolbar = document.createElement('km-toolbar-form-fields');
toolbar.fields = formFields;
document.querySelector('#kameo-toolbar').append(toolbar);
```

## License

The MIT License (MIT). Please see [License](LICENSE) for more information.
