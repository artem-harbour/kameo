import { updateDOMAttributes } from './helpers/updateDOMAttributes.js';

const rootClass = 'km-form-element-view';
const elementClass = 'km-form-element';

export class FormElementView {
  editor;

  options;

  extension;

  node;

  decorations;

  innerDecorations;

  view;

  getPos;

  HTMLAttributes;

  root;

  element;

  tagName;

  isDragging = false;

  constructor(props, options) {
    this.editor = props.editor;
    this.options = {
      stopEvent: null,
      ignoreMutation: null,
      ...options,
    };
    this.extension = props.extension;
    this.node = props.node;
    this.decorations = props.decorations;
    this.innerDecorations = props.innerDecorations;
    this.view = props.view;
    this.HTMLAttributes = props.HTMLAttributes;
    this.tagName = props.tagName;
    this.getPos = props.getPos;
    this.mount();
  }

  mount() {
    return;
  }

  get dom() {
    return this.root;
  }

  get contentDOM() {
    return null;
  }

  /**
   * Create DOM.
   */
  createDOM({ element }) {
    const dom = document.createElement('div');

    dom.classList.add(rootClass);

    if (element) dom.append(element);

    return dom;
  }

  /**
   * Create element.
   */
  createElement() {
    const element = document.createElement(this.tagName);
    
    element.classList.add(elementClass);
    
    updateDOMAttributes(element, this.node.attrs);
    
    return element;
  }

  // TODO
  onDragStart(event) {}

  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(attrs) {
    this.editor.commands.command(({ tr }) => {
      const pos = this.getPos();

      if (typeof pos !== 'number') {
        return false;
      }

      tr.setNodeMarkup(pos, undefined, {
        ...this.node.attrs,
        ...attrs,
      });

      return true;
    });
  }

  /**
   * Delete the node.
   */
  deleteNode() {
    const from = this.getPos();

    if (typeof from !== 'number') {
      return;
    }

    const to = from + this.node.nodeSize;
    this.editor.commands.deleteRange({ from, to });
  }

  /**
   * Update NodeView (otherwise the NodeView is recreated).
   */
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;

    updateDOMAttributes(this.element, node.attrs);

    return true;
  }

  destroy() {
    this.options.destroy?.();
    this.dom.remove();
  }

  /// TODO
  stopEvent(event) {
    let target = event.target;

    let isInput = ['wa-input'].includes(target.tagName.toLowerCase());
    
    // any input event within node views should be ignored by ProseMirror.
    if (isInput) {
      return true;
    }

    return false;
  }

  /// TODO
  ignoreMutation(mutation) {
    // https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/NodeView.ts
    // a leaf/atom node is like a black box for ProseMirror
    // and should be fully handled by the node view.
    return true;
  }
}
