import { Editor } from '@tiptap/core';
import { style } from './style.js';
import { createStyleTag } from './utilities/createStyleTag.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';

export class Kameo extends Editor {

  constructor(options = {}) {
    let allOptions = {
      documentMode: 'builder',
      ...options,
    };

    super(allOptions);

    this.#init(allOptions);
  }
  
  #init(options) {
    this.setDocumentMode(options.documentMode);
  }

  setDocumentMode(mode) {
    let modes = {
      builder: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(true, false);
      },
      render: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(false, false);
      },
    };

    let handleMode = modes[mode] ?? modes.builder;

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

  static setAssetsBasePath(path) {
    setBasePath(path);
  }
}
