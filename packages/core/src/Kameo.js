import { Editor } from '@tiptap/core';

export class Kameo extends Editor {

  constructor(options = {}) {
    options = {
      ...options,
      injectCSS: false,
    };
    
    super(options);
  }

  prependClass() {
    this.view.dom.className = `kameo ${this.view.dom.className}`;
  }
}
