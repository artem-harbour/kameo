import { LitElement, html, css } from 'lit';

export class FormActions extends LitElement {
  static properties = {};

  constructor() {
    super();
  }

  handleAddClick() {
    this.dispatchActionEvent({ type: 'add' });
  }

  dispatchActionEvent({ type }) {
    const event = new CustomEvent('action', {
      detail: { type },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="form-actions">
        <div class="form-actions__button form-actions__button--add" @click=${this.handleAddClick}>
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </div>
        <div class="form-actions__button form-actions__button--move">
          <slot name="drag"></slot>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      display: flex;
      width: 100px;
      position: absolute;
      top: 0;
      left: -100px;
      z-index: 3;
    }

    /* Drag handle */
    ::slotted(*) {
      width: 17px;
      height: 24px;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23898884" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding: 3px 2px;
    }

    .form-actions__button {
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;
      transition: background-color 100ms ease-in-out;
      border-radius: 7px;
      cursor: pointer !important;
    }

    .form-actions__button:last-child {
      margin-right: 3px;
    }

    .form-actions__button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .form-actions__button:hover .svg {
      color: #37352f;
    }

    .form-actions__button .svg {
      width: 17px;
      color: #898884;
      transition: color 100ms ease-in-out;
    }
    
    .form-actions__button--add .svg {
      width: 18px;
      height: 18px;
    }

    .form-actions__button--move {
      width: 20px;
    }

    .form-actions__button--move:hover ::slotted(*) {
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2337352f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>');
    }
  `
}

customElements.define('km-form-actions', FormActions);
