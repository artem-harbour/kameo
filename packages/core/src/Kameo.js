import { Editor } from '@tiptap/core';
import { style } from './style.js';
import { createStyleTag } from './utilities/createStyleTag.js';
import { getFormData } from './helpers/getFormData.js';

export class Kameo extends Editor {

  constructor(options = {}) {
    const allOptions = {
      documentMode: 'edit',
      enableValidation: false,
      onSubmit: () => null,
      onSubmitted: () => null,
      ...options,
    };

    super(allOptions);

    this.#init(allOptions);
  }

  get documentMode() {
    return this.options.documentMode;
  }
  
  #init(options) {
    this.setDocumentMode(options.documentMode, { isInit: true });
    
    this.on('submit', this.options.onSubmit);
    this.on('submitted', this.options.onSubmitted);
  }

  setDocumentMode(mode, { isInit = false } = {}) {
    const [editModeClass, viewModeClass] = ['kameo--edit-mode', 'kameo--view-mode'];

    const modes = {
      edit: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(true, false);
        this.view.dom.classList.add(editModeClass);
        this.view.dom.classList.remove(viewModeClass);
        this.emit('documentModeUpdate', {
          editor: this,
          mode: 'edit',
          isInit,
        });
      },
      view: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(false, false);
        this.view.dom.classList.add(viewModeClass);
        this.view.dom.classList.remove(editModeClass);
        this.emit('documentModeUpdate', {
          editor: this,
          mode: 'view',
          isInit,
        });
      },
    };

    let handleMode = modes[mode] ?? modes.edit;

    handleMode();
  }

  /**
   * Overridden method.
   */
  injectCSS() {
    if (this.options.injectCSS && document) {
      this.css = createStyleTag(style, this.options.injectNonce);
    }
  }

  /**
   * Overridden method.
   */
  prependClass() {
    this.view.dom.className = `kameo ${this.view.dom.className}`;
  }

  /**
   * TODO: Validation, check if submit in progress?
   */
  submit(props = {}, options = {}) {
    const formData = getFormData(this.state.doc);

    const submitEvent = {
      formData,
      timestamp: new Date(),
      setSubmitResult: (success, message = '') => {
        this.emit('submitted', {
          formData,
          success,
          message,
          ...props,
        });
      },
      ...props,
    };

    this.emit('submit', submitEvent);

    return submitEvent;
  }

  validate() {}
}
