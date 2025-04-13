import '@kameo/form-input-base';
import { Extension } from '@kameo/core';
import { Document } from '@kameo/extension-document';
import { Paragraph } from '@kameo/extension-paragraph';
import { Heading } from '@kameo/extension-heading';
import { Blockquote } from '@kameo/extension-blockquote';
import { Text } from '@kameo/extension-text';
import { Bold } from '@kameo/extension-bold';
import { Italic } from '@kameo/extension-italic';
import { Underline } from '@kameo/extension-underline';
import { Strike } from '@kameo/extension-strike';
import { Dropcursor } from '@kameo/extension-dropcursor';
import { Gapcursor } from '@kameo/extension-gapcursor';
import { History } from '@kameo/extension-history';
import { FormBase } from '@kameo/extension-form-base';
import { FormInputText } from '@kameo/extension-form-input-text';
import { FormInputName } from '@kameo/extension-form-input-name';
import { FormInputEmail } from '@kameo/extension-form-input-email';
import { FormRating } from '@kameo/extension-form-rating';
import { FormSubmit } from '@kameo/extension-form-submit';
 
export const StarterKit = Extension.create({
  name: 'starterKit',

  addExtensions() {
    const extensions = []

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }

    if (this.options.underline !== false) {
      extensions.push(Underline.configure(this.options?.underline));
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike));
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document));
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor));
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor))
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history));
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options?.heading));
    }

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote));
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

    if (this.options.formRating !== false) {
      extensions.push(FormRating.configure(this.options?.formRating));
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
