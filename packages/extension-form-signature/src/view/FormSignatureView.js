import { FormElementView } from '@kameo/core';

export class FormSignatureView extends FormElementView {
  constructor(props, options = {}) {
    super(props, options);

    this._handleInput = this._handleInput.bind(this);

    this._addEventListeners();
  }

  mount(props) {
    this.element = this.createElement();
    this.element.value = this.node.attrs.value;

    this.root = this.createView({
      element: this.element,
    });
  }

  _handleInput(event) {
    const { value } = event.detail;

    this.updateAttributes({ value });

    this.editor.emitNodeEvent(this.node.type.name, 'input', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _addEventListeners() {
    this.element.addEventListener('input', this._handleInput);
  }

  _removeEventListeners() {
    this.element.removeEventListener('input', this._handleInput);
  }

  update(node) {
    return super.update(node);
  }

  destroy() {
    super.destroy();
    this._removeEventListeners();
  }
}
