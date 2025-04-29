import { FormElementView } from '@kameo/core';

export class FormCheckboxView extends FormElementView {

  constructor(props, options = {}) {
    super(props, options);

    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.addEventListeners();
  }

  mount() {
    const nodeType = this.node.type.name;

    this.element = this.createElement();
    this.element.textContent = this.node.attrs.label;
    this.element.dataset.type = nodeType;
    this.element.classList.add(`km-form-element--${nodeType}`);

    this.root = this.createView({
      element: this.element,
    });
  }

  handleChange(event) {
    this.updateAttributes({
      checked: event.target.checked,
    });

    this.editor.emitNodeEvent(this.node.type.name, 'change', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  handleInput(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'input', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
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

  addEventListeners() {
    this.element.addEventListener('wa-change', this.handleChange);
    this.element.addEventListener('input', this.handleInput);
    this.element.addEventListener('focus', this.handleFocus);
    this.element.addEventListener('blur', this.handleBlur);
  }

  removeEventListeners() {
    this.element.removeEventListener('wa-change', this.handleChange);
    this.element.removeEventListener('input', this.handleInput);
    this.element.removeEventListener('focus', this.handleFocus);
    this.element.removeEventListener('blur', this.handleBlur);
  }

  update(node) {
    const result = super.update(node);

    if (!result) {
      return false;
    }

    this.element.textContent = this.node.attrs.label;
    
    return true;
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
