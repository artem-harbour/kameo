import { Extension } from '@kameo/core';
import { FormInputText } from '@kameo/extension-form-input-text';
import { FormInputName } from '@kameo/extension-form-input-name';
import { FormInputEmail } from '@kameo/extension-form-input-email';
import { FormInputNumber } from '@kameo/extension-form-input-number';
import { FormInputDate } from '@kameo/extension-form-input-date';
import { FormInputTime } from '@kameo/extension-form-input-time';
import { FormTextarea } from '@kameo/extension-form-textarea';
import { FormCheckbox } from '@kameo/extension-form-checkbox';
import { FormSwitch } from '@kameo/extension-form-switch';
import { FormRating } from '@kameo/extension-form-rating';
import { FormSlider } from '@kameo/extension-form-slider';
import { FormSubmit } from '@kameo/extension-form-submit';

export const FormKit = Extension.create({
  name: 'formKit',

  addExtensions() {
    const extensions = [];
    
    if (this.options.formInputText !== false) {
      extensions.push(FormInputText.configure(this.options.formInputText));
    }

    if (this.options.formInputName !== false) {
      extensions.push(FormInputName.configure(this.options.formInputName));
    }

    if (this.options.formInputEmail !== false) {
      extensions.push(FormInputEmail.configure(this.options.formInputEmail));
    }

    if (this.options.formInputNumber !== false) {
      extensions.push(FormInputNumber.configure(this.options.formInputNumber));
    }

    if (this.options.formInputDate !== false) {
      extensions.push(FormInputDate.configure(this.options.formInputDate));
    }

    if (this.options.formInputTime !== false) {
      extensions.push(FormInputTime.configure(this.options.formInputTime));
    }

    if (this.options.formTextarea !== false) {
      extensions.push(FormTextarea.configure(this.options.formTextarea));
    }

    if (this.options.formCheckbox !== false) {
      extensions.push(FormCheckbox.configure(this.options.formCheckbox));
    }

    if (this.options.formSwitch !== false) {
      extensions.push(FormSwitch.configure(this.options.formSwitch));
    }

    if (this.options.formRating !== false) {
      extensions.push(FormRating.configure(this.options.formRating));
    }

    if (this.options.formSlider !== false) {
      extensions.push(FormSlider.configure(this.options.formSlider));
    }

    if (this.options.formSubmit !== false) {
      extensions.push(FormSubmit.configure(this.options.formSubmit));
    }

    return extensions;
  },
});
