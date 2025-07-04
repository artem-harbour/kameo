import { Extension } from '@kameo/core';
import { FormInput } from '@kameo/extension-form-input';
import { FormTextarea } from '@kameo/extension-form-textarea';
import { FormCheckbox } from '@kameo/extension-form-checkbox';
import { FormSelect } from '@kameo/extension-form-select';
import { FormRadioGroup } from '@kameo/extension-form-radio-group';
import { FormSwitch } from '@kameo/extension-form-switch';
import { FormRating } from '@kameo/extension-form-rating';
import { FormSignature } from '@kameo/extension-form-signature';
import { FormSlider } from '@kameo/extension-form-slider';
import { FormSubmit } from '@kameo/extension-form-submit';

/**
 * The form kit is a collection of form editor extensions.
 *
 * It's a good starting point for building forms in Kameo.
 */
export const FormKit = Extension.create({
  name: 'formKit',

  addExtensions() {
    const extensions = [];

    if (this.options.formInput !== false) {
      extensions.push(FormInput.configure(this.options.formInput));
    }
    
    if (this.options.formTextarea !== false) {
      extensions.push(FormTextarea.configure(this.options.formTextarea));
    }

    if (this.options.formCheckbox !== false) {
      extensions.push(FormCheckbox.configure(this.options.formCheckbox));
    }

    if (this.options.formSelect !== false) {
      extensions.push(FormSelect.configure(this.options.formSelect));
    }

    if (this.options.formRadioGroup !== false) {
      extensions.push(FormRadioGroup.configure(this.options.formRadioGroup));
    }

    if (this.options.formSwitch !== false) {
      extensions.push(FormSwitch.configure(this.options.formSwitch));
    }

    if (this.options.formRating !== false) {
      extensions.push(FormRating.configure(this.options.formRating));
    }

    if (this.options.formSignature !== false) {
      extensions.push(FormSignature.configure(this.options.formSignature));
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
