import { FormElementView } from '@kameo/core';

export class FormInputTextView extends FormElementView {

  constructor(props, options) {
    super(props, options);

    this.onInput = this.onInput.bind(this);

    this.addEventListeners();
  }

  mount() {
    this.element = this.createElement();

    const nodeName = this.node.type.name;
    this.element.dataset.type = nodeName;
    this.element.classList.add(`km-form-element--${nodeName}`);
    
    this.root = this.createDOM({
      element: this.element,
    });
  }

  onInput(event) {
    this.updateAttributes({
      value: event.target.value,
    });
  }

  addEventListeners() {
    this.element.addEventListener('wa-input', this.onInput);
  }

  removeEventListeners() {
    this.element.removeEventListener('wa-input', this.onInput);
  }

  update(node) {
    return super.update(node);
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
