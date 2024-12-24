import { FormElement } from '@base/index.js';
import { html, css } from 'lit';

export class FormInputTextElement extends FormElement {

  constructor() {
    super();

    this.id = '';
    this.name = '';
    this.value = '';
    this.label = '';
    this.placeholder = '';
    this.required = false;
  }

  static properties = {
    id: { type: String },
    name: { type: String },
    value: { type: String },
    label: { type: String },
    placeholder: { type: String },
    required: { type: Boolean },
  }

  _handleInput(event) {
    this.value = event.target.value;

    this.dispatchEvent(new CustomEvent('field-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <div class="form-field">
        <div class="form-field__content">

          ${this.label ? html`
            <div class="form-field__label">
              ${this.label}
              ${this.required ? html`<span class="required">*</span>` : null}
            </div>
          ` : null}

          <div class="form-field__element">
            <input
              class="form-field__input-element"
              type="text"
              .id=${this.id}
              .name=${this.name}
              .value=${this.value}
              .placeholder=${this.placeholder}
              ?required=${this.required}
              @input=${this._handleInput}
            />
          </div>

          <!-- TODO: validation
            <div class="form-field__error">Error</div> 
          -->

        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      display: block;
      width: 100%;
      position: relative;
      margin: 16px 0;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;
    }

    .form-field__content {
      display: flex;
      flex-direction: column;
    }

    .form-field__label {
      display: block;
      margin-bottom: 8px;
    }

    .form-field__element {
      position: relative;
    }

    .form-field__input-element {
      font-family: inherit;
      font-size: 16px;
      color: #363636;
      display: block;
      width: 100%;
      height: 42px;
      padding: 10px 12px;
      margin: 0;
      background-color: #fff;
      border: 1px solid #dbdbdb;
      border-radius: 6px;
      box-shadow: none;
      appearance: none;
      outline: none;
      box-sizing: border-box;
    }
      
    .form-field__input-element:hover {
      border-color: #b5b5b5;
    }

    .form-field__input-element:active,
    .form-field__input-element:focus {
      border-color: #7957d5;
      box-shadow: 0 0 0 2px rgba(124, 58, 237, .25);
    }

    .form-field__input-element::placeholder {
      color: #898989;
      opacity: 1;
    }

    .form-field__error {
      font-size: 14px;
      color: red;
      margin-top: 4px;
    }
  `
}

customElements.define('k-form-input-text', FormInputTextElement);
