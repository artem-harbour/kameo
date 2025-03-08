import { FormElementView } from '@kameo/core';

export class FormSubmitView extends FormElementView {

  constructor(props, options = {}) {
    super(props, { ...options });

    this.onClick = this.onClick.bind(this);
    this.onSubmitted = this.onSubmitted.bind(this);

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

  onClick(event) {
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
  }

  onSubmitted() {
    const { disableOnSubmit } = this.options;

    if (disableOnSubmit) {
      this.updateAttributes({ 
        loading: false, 
        disabled: false, 
      });
    }
  }

  addEventListeners() {
    this.editor.on('submitted', this.onSubmitted);
    this.element.addEventListener('click', this.onClick);
  }

  removeEventListeners() {
    this.editor.off('submitted', this.onSubmitted);
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
