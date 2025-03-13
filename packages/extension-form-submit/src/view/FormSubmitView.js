import { FormElementView } from '@kameo/core';

export class FormSubmitView extends FormElementView {

  constructor(props, options = {}) {
    super(props, { ...options });

    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmitted = this.handleSubmitted.bind(this);

    this.addEventListeners();
  }

  mount() {
    const nodeTypeName = this.node.type.name;

    this.element = this.createElement();
    this.element.textContent = this.node.attrs.text;
    this.element.dataset.type = nodeTypeName;
    this.element.classList.add(`km-form-element--${nodeTypeName}`);

    this.root = this.createView({
      element: this.element,
    });
  }

  handleClick(event) {
    if (this.editor.documentMode === 'edit') {
      return;
    }

    if (typeof this.options.handleClick === 'function') {
      this.options.handleClick({
        event,
        editor: this.editor,
        nodeView: this,
      });
      return;
    }
    
    this.handleSubmit(event);
  }

  handleFocus(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'focus', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  handleBlur(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'blur', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  handleSubmit(event) {
    const { loading, disabled } = this.node.attrs;
    const { submitProps, disableOnSubmit } = this.options;

    if (loading || disabled) {
      return;
    }

    if (disableOnSubmit) {
      this.updateAttributes({ 
        loading: true, 
        disabled: true, 
      });
    }

    this.editor.submit({ ...submitProps });
    this.editor.emitNodeEvent(this.node.type.name, 'click', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  handleSubmitted() {
    const { disableOnSubmit } = this.options;

    if (disableOnSubmit) {
      this.updateAttributes({ 
        loading: false, 
        disabled: false, 
      });
    }
  }

  addEventListeners() {
    this.editor.on('submitted', this.handleSubmitted);
    this.element.addEventListener('click', this.handleClick);
    this.element.addEventListener('focus', this.handleFocus);
    this.element.addEventListener('blur', this.handleBlur);
  }

  removeEventListeners() {
    this.editor.off('submitted', this.handleSubmitted);
    this.element.removeEventListener('click', this.handleClick);
    this.element.removeEventListener('focus', this.handleFocus);
    this.element.removeEventListener('blur', this.handleBlur);
  }

  update(node) {
    const result = super.update(node);

    if (!result) {
      return false;
    }

    this.element.textContent = this.node.attrs.text;
    
    return true;
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
