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
    this._closeMenuOnClickOutside = this._closeMenuOnClickOutside.bind(this);
  }

  _handleAddClick() {
    this._dispatchActionEvent({ type: 'add' });
  }

  _handleMoveClick(event) {
    event.stopPropagation();
    this.isMenuActive = !this.isMenuActive;
  }

  _handleMenuItemClick({ type } = {}) {
    this._dispatchActionEvent({ type });
    this.closeMenu();
  }

  closeMenu() {
    this.isMenuActive = false;
  }

  _closeMenuOnClickOutside(event) {
    if (!this.isMenuActive) {
      return;
    }

    const path = event.composedPath();
    const menu = this.shadowRoot.querySelector('.form-actions-menu');
    const isInsideMenu = path.some((el) => {
      return el instanceof Element && menu.contains(el);
    });

    if (!isInsideMenu) {
      this.closeMenu();
    }
  }

  _dispatchActionEvent({ type }) {
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
    document.addEventListener('click', this._closeMenuOnClickOutside);
  }
  
  disconnectedCallback() {
    document.removeEventListener('click', this._closeMenuOnClickOutside);
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="form-actions">
        <div class="form-actions__button form-actions__button--add" @click=${this._handleAddClick}>
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        </div>
        <div class="form-actions__button form-actions__button--move" @click=${this._handleMoveClick}>
          <slot name="drag"></slot>
        </div>

        <div class="form-actions-menu ${this.isMenuActive ? 'form-actions-menu--open' : ''}">
            <div class="form-actions-menu__menu">
              <div class="form-actions-menu__item" @click=${() => this._handleMenuItemClick({ type: 'settings' })}>
                <div class="form-actions-menu__item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <div class="form-actions-menu__item-title"><span>Settings</span></div>
              </div>
              <div class="form-actions-menu__item" @click=${() => this._handleMenuItemClick({ type: 'duplicate' })}>
                <div class="form-actions-menu__item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </div>
                <div class="form-actions-menu__item-title"><span>Duplicate</span></div>
              </div>
              <div class="form-actions-menu__item" @click=${() => this._handleMenuItemClick({ type: 'delete' })}>
                <div class="form-actions-menu__item-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </div>
                <div class="form-actions-menu__item-title"><span>Delete</span></div>
              </div>
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

    :host([data-active]) ::slotted(*) {
      pointer-events: none;
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
      
      flex-direction: column;
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
      display: flex;
    }

    .form-actions-menu__menu {
      display: flex;
      flex-direction: column;
      user-select: none;
    }

    .form-actions-menu__item {
      font-size: 14px;
      color: #37352f;
      line-height: 1.1;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 8px;
      width: calc(100% - 8px);
      height: 28px;
      margin: 0px 4px;
      padding: 0px 10px;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      box-sizing: border-box;
      transition: background-color 50ms ease-in-out;
    }

    .form-actions-menu__item--disabled,
    .form-actions-menu__item--disabled svg {
      pointer-events: none;
      color: #bbbab8 !important;
    }

    .form-actions-menu__item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .form-actions-menu__item:hover svg {
      color: #37352f
    }

    .form-actions-menu__item-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .form-actions-menu__item-icon svg {
      display: block;
      color: #898884;
    }

    .form-actions-menu__item-title {
      display: inline-flex;
      overflow: hidden;
    }

    .form-actions-menu__item-title span {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
}

customElements.define('km-form-actions', FormActions);
