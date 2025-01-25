
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

  tagName;

  element;

  component;

  constructor(props, options) {
    this.editor = props.editor;
    this.options = {
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
    return this.element;
  }

  get contentDOM() {
    return null;
  }

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

  deleteNode() {
    const from = this.getPos();

    if (typeof from !== 'number') {
      return;
    }

    const to = from + this.node.nodeSize;
    this.editor.commands.deleteRange({ from, to })
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

  ignoreMutation(mutation) {
    // https://github.com/ueberdosis/tiptap/blob/main/packages/core/src/NodeView.ts
    // a leaf/atom node is like a black box for ProseMirror
    // and should be fully handled by the node view.
    return true;
  }

  // update⁠() {}
  // stopEvent⁠() {}
  // ignoreMutation⁠() {}
  // destroy⁠() {}
}
