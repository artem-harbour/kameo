import { FormElementView, kameoHelpers } from '@kameo/core';

export class FormSubmitView extends FormElementView {

  constructor(props, options) {
    super(props, { ...options });

    this.onClick = this.onClick.bind(this);

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

  // TODO: handle submit action and logic.
  onClick(event) {
    const formData = kameoHelpers.getFormData(this.editor.state);
    console.log('Submit', { formData });
  }

  addEventListeners() {
    this.element.addEventListener('click', this.onClick);
  }

  removeEventListeners() {
    this.element.removeEventListener('click', this.onClick);
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
