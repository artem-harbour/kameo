import { FormElementView } from '@kameo/core';

export class FormRatingView extends FormElementView {

  constructor(props, options = {}) {
    super(props, { ...options });

    this.handleChange = this.handleChange.bind(this);
    this.handleHover = this.handleHover.bind(this);

    this.addEventListeners();
  }

  mount() {
    const nodeType = this.node.type.name;

    this.element = this.createElement();
    this.element.dataset.type = nodeType;
    this.element.classList.add(`km-form-element--${nodeType}`);

    this.root = this.createView({
      element: this.element,
    });
  }

  handleChange(event) {
    this.updateAttributes({
      value: event.target.value,
    });
    
    this.editor.emitNodeEvent(this.node.type.name, 'change', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  handleHover(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'hover', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  addEventListeners() {
    this.element.addEventListener('wa-change', this.handleChange);
    this.element.addEventListener('wa-hover', this.handleHover);
  }

  removeEventListeners() {
    this.element.removeEventListener('wa-change', this.handleChange);
    this.element.removeEventListener('wa-hover', this.handleHover);
  }

  update(node) {
    return super.update(node);
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
