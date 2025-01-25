import { FormElementView } from '@kameo/core';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export class FormInputTextView extends FormElementView {

  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);

    this.addEventListeners();
  }

  mount() {
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    const component = document.createElement(this.tagName);

    element.classList.add('km-form-element');
    element.append(component);

    updateDOMAttributes(component, this.node.attrs);

    this.component = component;

    return element;
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
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;
    
    updateDOMAttributes(this.component, node.attrs);

    return true;
  }

  destroy() {
    this.removeEventListeners();
  }
}

function updateDOMAttributes(dom, attrs = {}) {
  Object.entries(attrs).forEach(([key, value]) => {
    const handlers = {
      required: () => {
        if (!value) {
          dom.removeAttribute(key);
          return;
        }
        dom.setAttribute(key, '');
      },
      default: () => {
        dom.setAttribute(key, value);
      },
    };
    
    const update = handlers[key] ?? handlers.default;

    update()
  });
}
