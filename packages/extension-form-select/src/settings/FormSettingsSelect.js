import { LitElement, html, css } from 'lit';

export class FormSettingsSelect extends LitElement {

  static properties = {
    control: {
      type: Object,
      attribute: false,
    },
    editor: {
      type: Object,
      attribute: false,
    },
    node: {
      type: Object,
      attribute: false,
    },
    nodeView: {
      type: Object,
      attribute: false,
    },
  };

  constructor() {
    super();

    this.editor = null;
    this.node = null;
    this.nodeView = null;
    this.control = null;
  }

  _handleAttributeUpdate({ event, attr, value, index }) {
    const { getPos } = this.nodeView;
    const pos = getPos();

    if (typeof pos !== 'number') {
      return;
    }

    const select = { node: this.node, pos };
    const attrs = { [attr]: value };

    this.editor.commands.updateFormSelectOption(select, index, attrs);
  }

  _handleAddClick() {
    const { getPos } = this.nodeView;
    const pos = getPos();

    if (typeof pos !== 'number') {
      return;
    }

    const select = { node: this.node, pos };
    const option = {
      value: '',
      label: '',
      disabled: false,
    };

    this.editor.commands.addFormSelectOption(select, option);
  }

  _handleDeleteClick(index) {
    const { getPos } = this.nodeView;
    const pos = getPos();

    if (typeof pos !== 'number') {
      return;
    }

    const select = { node: this.node, pos };

    this.editor.commands.removeFormSelectOption(select, index);
  }

  _renderSettings() {
    const options = this.node.attrs.options ?? [];

    return html`
      <div class="form-settings__options">
        <div class="form-settings__options-head">
          <div class="form-settings__options-title">Label</div>
          <div class="form-settings__options-title">Value</div>
        </div>
        ${options.map(
          (option, index) => html`
            <div class="form-settings__option">
              <div class="form-settings__option-item">
                <wa-input 
                  type="text"
                  .value=${option.label}
                  size="small"
                  @input=${(event) => this._handleAttributeUpdate({
                    event,
                    index,
                    attr: 'label',
                    value: event.target.value,
                  })}>
                </wa-input>
              </div>
              <div class="form-settings__option-item">
                <wa-input 
                  type="text"
                  .value=${option.value}
                  size="small"
                  @input=${(event) => this._handleAttributeUpdate({
                    event,
                    index,
                    attr: 'value',
                    value: event.target.value,
                  })}>
                </wa-input>
              </div>
              <div class="form-settings__option-item form-settings__option-item--delete">
                <div class="form-settings__delete-option" @click=${() => this._handleDeleteClick(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </div>
              </div>
            </div>
          `
        )}
      </div>

      <div class="form-settings__add-option">
        <wa-button variant="neutral" size="small" @click=${this._handleAddClick}>Add option</wa-button>
      </div>
    `
  }

  render() {
    return html`
      <div class="form-settings">
        ${this._renderSettings()}
      </div>
    `;
  }

  static styles = css`
    :host {
      --col-width: 140px;

      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }

    .form-settings {
      display: flex;
      flex-direction: column;
      padding: 6px 0;
    }

    .form-settings__options {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-settings__options-head {
      display: flex;
      gap: 6px;
    }

    .form-settings__options-title {
      font-size: 14px;
      width: var(--col-width);
    }

    .form-settings__option {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .form-settings__option-item {
      width: var(--col-width);
    }

    .form-settings__option-item--delete {
      width: auto;
    }

    .form-settings__add-option {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }

    .form-settings__delete-option {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      cursor: pointer;
    }

    .form-settings__delete-option:hover svg {
      color: #37352f
    }

    .form-settings__delete-option svg {
      display: block;
      color: #898884;
    }
  `
}

customElements.define('km-form-settings-select', FormSettingsSelect);
