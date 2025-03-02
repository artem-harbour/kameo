import { Editor } from '@tiptap/core';
import { style } from './style.js';
import { createStyleTag } from './utilities/createStyleTag.js';

export class Kameo extends Editor {

  constructor(options = {}) {
    let allOptions = {
      documentMode: 'edit',
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
  }

  setDocumentMode(mode, { isInit = false } = {}) {
    let [editModeClass, viewModeClass] = ['kameo--edit-mode', 'kameo--view-mode'];

    let modes = {
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

  submit() {
    console.log('Submit');
  }

  validate() {}
}
