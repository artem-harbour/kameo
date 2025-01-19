import { NodeView } from '@base/index.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export class FormInputTextView extends NodeView {
  editor;

  node;

  HTMLAttributes;

  decorations;

  getPos;

  extension;

  tagName;

  dom;

  constructor(options) {
    super();

    this.editor = options.editor;
    this.node = options.node;
    this.HTMLAttributes = options.HTMLAttributes;
    this.decorations = options.decorations;
    this.getPos = options.getPos;
    this.tagName = options.tagName;
    this.extension = options.extension;

    this.handleFieldInput = this.handleFieldInput.bind(this);

    this.buildView();
    this.attachEventListeners();
  }

  buildView() {
    let { dom } = this.createDOM();

    this.dom = dom;
  }

  createDOM() {
    let dom = document.createElement(this.tagName);

    updateDomAttributes(dom, this.node.attrs);

    return {
      dom,
    };
  }

  attachEventListeners() {
    this.dom.addEventListener('field-input', this.handleFieldInput);
  }

  removeEventListeners() {
    this.dom.removeEventListener('field-input', this.handleFieldInput);
  }

  handleFieldInput(event) {
    this.updateAttributes({
      value: event.detail.value,
    });

    // emit editor event here?
  }

  // Can be used to manually update NodeView,
  // otherwise NodeView is recreated.
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;

    updateDomAttributes(this.dom, node.attrs);

    return true;
  }

  stopEvent(event) {
    let target = event.target;

    let isInput = [this.tagName].includes(target.tagName.toLowerCase());
    
    // any input event within node views should be ignored by ProseMirror.
    if (isInput) {
      return true;
    }

    return false;
  }

  ignoreMutation(mutation) {
    // https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/NodeView.ts
    // a leaf/atom node is like a black box for ProseMirror
    // and should be fully handled by the node view.
    return true;
  }

  destroy() {
    this.removeEventListeners();
  }
}

function updateDomAttributes(dom, attrs = {}) {
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null) return;

    let handlers = {
      required: () => {
        if (!value) return;
        dom.setAttribute(key, '');
      },
      default: () => {
        dom.setAttribute(key, value);
      },
    };

    let handler = handlers[key] ?? handlers.default;

    handler();
  });
}
