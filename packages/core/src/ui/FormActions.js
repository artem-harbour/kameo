import { LitElement, html, css } from 'lit';

export class FormActions extends LitElement {
  static properties = {
    isMenuActive: { 
      type: Boolean,
      attribute: false,
    },
  };

  constructor() {
    super();
    this.isMenuActive = false;
    this.closeMenuOnClickOutside = this.closeMenuOnClickOutside.bind(this);
  }

  handleAddClick() {
    this.dispatchActionEvent({ type: 'add' });
  }

  handleMoveClick(event) {
    event.stopPropagation();
    this.isMenuActive = !this.isMenuActive;
  }

  closeMenuOnClickOutside(event) {
    if (!this.isMenuActive) {
      return;
    }

    const path = event.composedPath();
    const menu = this.shadowRoot.querySelector('.form-actions-menu');
    const isInsideMenu = path.some((el) => {
      return el instanceof Element && menu.contains(el);
    });
    
    if (!isInsideMenu) {
      this.isMenuActive = false;
    }
  }

  dispatchActionEvent({ type }) {
    const event = new CustomEvent('action', {
      detail: { type },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  updated(changedProperties) {
    if (changedProperties.has('isMenuActive')) {
      if (this.isMenuActive) {
        this.dataset.active = true;
      } else {
        delete this.dataset.active;
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.closeMenuOnClickOutside);
  }
  
  disconnectedCallback() {
    document.removeEventListener('click', this.closeMenuOnClickOutside);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="form-actions">
        <div class="form-actions__button form-actions__button--add" @click=${this.handleAddClick}>
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </div>
        <div class="form-actions__button form-actions__button--move" @click=${this.handleMoveClick}>
          <slot name="drag"></slot>
        </div>

        <div class="form-actions-menu ${this.isMenuActive ? 'form-actions-menu--open' : ''}">
            <div class="form-actions-menu__menu">
              <div class="form-actions-menu__item">Item 1</div>
              <div class="form-actions-menu__item">Item 2</div>
              <div class="form-actions-menu__item">Item 3</div>
            </div>
          </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      --form-actions-width: 52px;

      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      display: flex;
      width: var(--form-actions-width);
      position: absolute;
      top: 0;
      left: calc(var(--form-actions-width) * -1);
      z-index: 10;
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
      position: relative;
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

    .form-actions-menu {
      --width: 200px;

      position: absolute;
      top: 0;
      right: 25px;
      width: var(--width);
      padding: 6px 0;
      background: #fff;
      border-radius: 6px;
      border: 1px solid #dfdfde;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
      overflow: hidden;
      z-index: 10;
      cursor: default;
      display: none;
    }

    .form-actions-menu--open {
      display: block;
    }

    .form-actions-menu__menu {
      display: flex;
      flex-direction: column;
    }

    .form-actions-menu__item {
      user-select: none;
    }
  `
}

customElements.define('km-form-actions', FormActions);
