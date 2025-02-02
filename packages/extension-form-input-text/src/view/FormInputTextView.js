import { FormElementView } from '@kameo/core';
import { kameoHelpers } from '@kameo/core';

const { updateDOMAttributes } = kameoHelpers;

export class FormInputTextView extends FormElementView {

  constructor(props, options) {
    super(props, options);

    this.onInput = this.onInput.bind(this);

    this.addEventListeners();
  }

  mount() {
    this.component = this.createComponent();

    this.root = this.createElement({
      component: this.component,
    });
  }

  onInput(event) {
    this.updateAttributes({
      value: event.target.value,
    });
  }

  addEventListeners() {
    this.component.addEventListener('wa-input', this.onInput);
  }

  removeEventListeners() {
    this.component.removeEventListener('wa-input', this.onInput);
  }

  update(node) {
    return super.update(node);
  }

  destroy() {
    super.destroy();
    this.removeEventListeners();
  }
}
