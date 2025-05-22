import { FormElementView } from '@kameo/core';

export class FormRatingView extends FormElementView {

  constructor(props, options = {}) {
    super(props, { ...options });

    this._handleChange = this._handleChange.bind(this);
    this._handleHover = this._handleHover.bind(this);

    this._addEventListeners();
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

  _handleChange(event) {
    console.log(event.target.value);
    this.updateAttributes({
      value: event.target.value,
    });
    
    this.editor.emitNodeEvent(this.node.type.name, 'change', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _handleHover(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'hover', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _addEventListeners() {
    this.element.addEventListener('wa-change', this._handleChange);
    this.element.addEventListener('wa-hover', this._handleHover);
  }

  _removeEventListeners() {
    this.element.removeEventListener('wa-change', this._handleChange);
    this.element.removeEventListener('wa-hover', this._handleHover);
  }

  update(node) {
    return super.update(node);
  }

  destroy() {
    super.destroy();
    this._removeEventListeners();
  }
}
