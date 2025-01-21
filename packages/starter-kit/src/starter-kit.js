import { Extension } from '@kameo/core';
import { Document } from '@kameo/extension-document';
import { Paragraph } from '@kameo/extension-paragraph'
import { Text } from '@kameo/extension-text';
import { FormInputText } from '@kameo/extension-form-input-text';
import { FormSubmit } from '@kameo/extension-form-submit';
 
export const StarterKit = Extension.create({
  name: 'starterKit',

  addExtensions() {
    const extensions = []

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }

    if (this.options.formInputText !== false) {
      extensions.push(FormInputText.configure(this.options?.formInputText));
    }

    if (this.options.formSubmit !== false) {
      extensions.push(FormSubmit.configure(this.options?.formSubmit));
    }

    return extensions;
  },
});
