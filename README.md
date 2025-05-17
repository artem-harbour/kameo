<p align="center">
  <a href="#" target="_blank">
    <img src="./assets/logo.svg?sanitize=true" width="180" height="180" alt="Kameo" />
  </a>
</p>

# Kameo

Kameo is a toolkit for creating and rendering interactive web forms within rich text content, based on ProseMirror.

## Screenshot

<p align="center">
  <img src="./assets/screenshot.webp" width="600px" alt="Kameo screenshot" />
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

```bash
npm install @kameo/core @kameo/pm @kameo/starter-kit @kameo/form-kit
npm install @kameo/toolbar-form-fields
```

**IMPORTANT**: 

## Quick start

```javascript
import '@kameo/core/style/theme.css';
import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { ToolbarFormFields, formFields } from '@kameo/toolbar-form-fields';

const kameo = new Kameo({
  element: document.querySelector('#kameo'),
  extensions: [
    StarterKit,
    FormKit,
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

Note: Kameo uses Web Awesome component library for which an npm package is not available yet. For now, we're getting access to Web Awesome through a temporary CDN. Once npm package is available, more information will be provided on how to configure it for a project.

## License

The MIT License (MIT). Please see [License](LICENSE) for more information.
