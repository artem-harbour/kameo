import { FormElementStore } from './FormElementStore.js';
import { getFormData } from './helpers/getFormData.js';
import { getAllFormFields } from './helpers/getAllFormFields.js';

export class FormManager {
  editor;

  elementStore;

  validation = {
    enabled: true,
    validateOnSubmit: true,
    showErrors: true,
    stopOnFirstError: false,
    useReportValidity: false,
  };

  constructor(props) {
    this.editor = props.editor;
    this.createElementStore();
    this.setValidationOptions(props.validation);
  }

  createElementStore() {
    this.elementStore = new FormElementStore({
      editor: this.editor,
    });
  }

  submit(props = {}) {
    const formData = this.getFormData();

    let valid = true;
    let validationResult = null;

    if (this.validation.validateOnSubmit) {
      const result = this.validate();
      valid = result.valid;
      validationResult = result.results;
    }

    const submitEvent = {
      formData,
      valid,
      validationResult,
      props: { ...props },
      setSubmitResult: ({ success, message = '', submitProps = {} }) => {
        this.editor.emit('submitted', {
          formData,
          success,
          message,
          props: { ...props, ...submitProps },
        });
      },
    };

    this.editor.emit('submit', submitEvent);

    return submitEvent;
  }

  validate(options = {}) {
    const {
      showErrors = this.validation.showErrors,
      useReportValidity = this.validation.useReportValidity,
      stopOnFirstError = this.validation.stopOnFirstError,
    } = options;

    if (!this.validation.enabled) {
      return { valid: true, results: [] };
    }

    const formFields = getAllFormFields(this.editor.state);
    const results = [];
    
    for (const formField of formFields) {
      const { node } = formField;
      const elementView = this.getElementView(node.attrs.id);

      if (!elementView) {
        continue;
      }

      const result = elementView.validateElement({ showErrors, useReportValidity });
      results.push({ 
        id: node.attrs.id,
        name: node.attrs.name,
        ...result, 
      });

      if (!result.valid && stopOnFirstError) {
        break;
      }
    }
    
    return {
      valid: results.every((result) => result.valid),
      results,
    };
  }

  setValidationOptions(options = {}) {
    this.validation = {
      ...this.validation,
      ...options,
    };
  }
  
  getFormData() {
    return getFormData(this.editor.state);
  }

  getElementView(id) {
    return this.elementStore.getView(id);
  }

  addElementView(id, elementView) {
    this.elementStore.addView(id, elementView);
  }

  removeElementView(id) {
    this.elementStore.removeView(id);
  }
}
