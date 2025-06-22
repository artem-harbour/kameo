import { FormElementView, kameoHelpers } from '@kameo/core';

const { updateDOMAttributes } = kameoHelpers;

export class FormRadioOptionsView extends FormElementView {
  constructor(props, options = {}) {
    super(props, options);

    this.tagNameOption = props.tagNameOption;

    this._handleInput = this._handleInput.bind(this);
    this._handleChange = this._handleChange.bind(this);

    this._addEventListeners();
  }

  mount(props) {
    this.element = this.createElement();

    const options = this.node.attrs.options ?? [];
    const optionElements = [];

    options.forEach((attrs) => {
      const option = document.createElement(props.tagNameOption);
      option.textContent = attrs.label;  
      updateDOMAttributes(option, attrs);
      optionElements.push(option);
    });
    this.element.append(...optionElements);

    this.root = this.createView({
      element: this.element,
    });
  }

  _handleInput(event) {
    this.updateAttributes({
      value: event.target.value,
    });

    this.editor.emitNodeEvent(this.node.type.name, 'input', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _handleChange(event) {
    this.editor.emitNodeEvent(this.node.type.name, 'change', { 
      event, 
      node: this.node, 
      nodeView: this, 
    });
  }

  _addEventListeners() {
    this.element.addEventListener('change', this._handleChange);
    this.element.addEventListener('input', this._handleInput);
  }

  _removeEventListeners() {
    this.element.removeEventListener('change', this._handleChange);
    this.element.removeEventListener('input', this._handleInput);
  }

  update(node) {
    const result = super.update(node);

    if (!result) {
      return false;
    }

    const options = this.node.attrs.options ?? [];
    const currentOptionElements = [...this.element.children];

    if (options.length === currentOptionElements.length) {
      options.forEach((attrs, index) => {
        const option = currentOptionElements[index];
        option.textContent = attrs.label;
        updateDOMAttributes(option, attrs);
      });
    } else {
      const optionElements = [];
      options.forEach((attrs) => {
        const option = document.createElement(this.tagNameOption);
        option.textContent = attrs.label;  
        updateDOMAttributes(option, attrs);
        optionElements.push(option);
      });
      this.element.replaceChildren(...optionElements);
    }

    return true;
  }

  destroy() {
    super.destroy();
    this._removeEventListeners();
  }
}
