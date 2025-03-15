import { Extension } from '@kameo/core';
import { Document } from '@kameo/extension-document';
import { Paragraph } from '@kameo/extension-paragraph'
import { Text } from '@kameo/extension-text';
import { Dropcursor } from '@kameo/extension-dropcursor';
import { History } from '@kameo/extension-history';
import { FormBase } from '@kameo/extension-form-base';
import { FormInputText } from '@kameo/extension-form-input-text';
import { FormInputName } from '@kameo/extension-form-input-name';
import { FormInputEmail } from '@kameo/extension-form-input-email';
import { FormInputJobTitle } from '@kameo/extension-form-input-job-title';
import { FormSubmit } from '@kameo/extension-form-submit';
 
export const StarterKit = Extension.create({
  name: 'starterKit',

  addExtensions() {
    const extensions = []

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor));
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history))
    }
    
    if (this.options.formBase !== false) {
      extensions.push(FormBase.configure(this.options?.formBase));
    }

    if (this.options.formInputText !== false) {
      extensions.push(FormInputText.configure(this.options?.formInputText));
    }

    if (this.options.formInputName !== false) {
      extensions.push(FormInputName.configure(this.options?.formInputName));
    }

    if (this.options.formInputEmail !== false) {
      extensions.push(FormInputEmail.configure(this.options?.formInputEmail));
    }

    if (this.options.formInputJobTitle !== false) {
      extensions.push(FormInputJobTitle.configure(this.options?.formInputJobTitle));
    }

    if (this.options.formSubmit !== false) {
      extensions.push(FormSubmit.configure(this.options?.formSubmit));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }

    return extensions;
  },
});
