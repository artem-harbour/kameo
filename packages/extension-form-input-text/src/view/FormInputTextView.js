import { FormElementView } from '@kameo/core';

export class FormInputTextView extends FormElementView {

  constructor(props, options = {}) {
    super(props, { ...options });

    this.onInput = this.onInput.bind(this);

    this.addEventListeners();
  }

  mount() {
    const nodeTypeName = this.node.type.name;

    this.element = this.createElement();
    this.element.dataset.type = nodeTypeName;
    this.element.classList.add(`km-form-element--${nodeTypeName}`);

    this.root = this.createView({
      element: this.element,
    });
  }

  onInput(event) {
    this.updateAttributes({
      value: event.target.value,
    });
  }

  addEventListeners() {
    // TODO: double check, wa-input or input event.
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
