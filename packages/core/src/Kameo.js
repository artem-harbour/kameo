import { Editor } from '@tiptap/core';

export class Kameo extends Editor {

  constructor(options = {}) {
    let allOptions = {
      documentMode: 'builder',
      ...options,

      // always overwritten
      injectCSS: false,
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

  prependClass() {
    this.view.dom.className = `kameo ${this.view.dom.className}`;
  }
}
