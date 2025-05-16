import { LitElement, html, css } from 'lit';
import { SECTIONS } from './constants.js';

export class FormSettings extends LitElement {
  static properties = {
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
    _settings: { state: true },
    _sections: { state: true },
  };

  constructor() {
    super();

    this.editor = null;
    this.node = null;
    this.nodeView = null;

    this._sections = SECTIONS;

    this._onEditorUpdate = this._onEditorUpdate.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.editor?.on('update', this._onEditorUpdate);
  }

  disconnectedCallback() {
    this.editor.off('update', this._onEditorUpdate);
    super.disconnectedCallback();
  }

  willUpdate(changedProperties) {
    const nodeChanged = changedProperties.has('node');
    const nodeViewChanged = changedProperties.has('nodeView');

    if (nodeChanged || nodeViewChanged) {
      this._setSettings();
    }
  }

  _onEditorUpdate() {
    if (this.nodeView) {
      this.node = this.nodeView.node;
    }
  }

  _setSettings() {
    const { storage } = this.editor;
    const settings = storage[this.node?.type.name]?.settings;
    this._settings = settings ?? null;
  }

  _updateAttributes(attrs) {
    this.editor.commands.command(({ tr }) => {
      const pos = this.nodeView.getPos();

      if (typeof pos !== 'number') {
        return false;
      }

      tr.setNodeMarkup(pos, undefined, {
        ...this.node.attrs,
        ...attrs,
      });

      return true;
    });
  }

  _handleAttributeUpdate({ event, control, value }) {
    const { attr } = control;

    this._updateAttributes({
      [attr]: value,
    });

    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('attribute-updated', {
        detail: { attr, value, node: this.node, nodeView: this.nodeView },
        bubbles: true,
        composed: true,
      }));
    });
  }

  _renderSettings() {
    return html`${Object.entries(this._sections).map(([_key, section]) => this._renderSection(section))}`;
  }

  _renderSection(section) {
    const settings = Object
      .entries(this._settings)
      .filter(([_key, item]) => item.section === section.key);

    if (!settings.length) {
      return null;
    }

    return html`
      <div class="form-settings__section">
        <div class="form-settings__section-label">${section.label}</div>
        <div class="form-settings__section-controls">
          ${settings.map(([_key, control]) => 
            this._renderControl({ control })
          )}
        </div>
      </div>
    `;
  }

  _renderControl({ control }) {
    const { controlType } = control;

    if (controlType === 'custom') {
      console.debug('Handle custom control'); // TODO: handle custom controls
      return null;
    }

    const handlers = {
      input: () => this._renderInputControl({ control }),
      select: () => this._renderSelectControl({ control }),
      checkbox: () => this._renderCheckboxControl({ control }),
      default: () => {
        console.debug('Not supported control');
        return null;
      },
    };

    const renderHandler = handlers[control.control] ?? handlers.default;

    return html`
      <div class="form-settings__control">
        ${renderHandler()}
      </div>
    `;
  }

  _renderInputControl({ control }) {
    const { attr, inputType, label, description } = control;
    const value = this._getAttrValue(attr);

    return html`
      <wa-input 
        .type="${inputType || 'text'}"
        .value="${value}"
        .label="${label}"
        .hint="${description}"
        size="small"
        @input=${(event) => this._handleAttributeUpdate({
          event,
          control,         
          value: event.target.value,
        })}>
      </wa-input>
    `;
  }

  _renderSelectControl({ control }) {
    const { attr, label, description, options } = control;
    const value = this._getAttrValue(attr);

    return html`
      <wa-select
        .label="${label}"
        .hint="${description}"
        size="small"
        @change=${(event) => this._handleAttributeUpdate({
          event,
          control,
          value: event.target.value,
        })}>
        ${options.map(
          (item, index) => html`
            <wa-option value=${item.value}>${item.label}</wa-option>
          `
        )}
      </wa-select>
    `
  }

  _renderCheckboxControl({ control }) {
    const { attr, label, description } = control;
    const value = this._getAttrValue(attr);

    return html`
      <wa-checkbox
        ?checked="${value}"
        .hint="${description}"
        size="small"
        @change=${(event) => this._handleAttributeUpdate({
          event,
          control,
          value: event.target.checked,
        })}>
        ${label}
      </wa-checkbox>
    `;
  }

  _getAttrValue(attr) {
    return this.node.attrs[attr];
  }

  render() {
    if (!this.node || !this._settings) {
      return html`<div class="no-settings">No settings</div>`;
    }

    return html`
      <div class="form-settings">
        <div class="form-settings__settings">
          ${this._renderSettings()}
        </div>
      </div>
    `;
  }

  // TODO
  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
    }

    .no-settings {
      font-size: 15px;
    }

    .form-settings {
      display: flex;
      flex-direction: column;
    }

    .form-settings__settings {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .form-settings__section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-settings__section-label {
      font-size: 18px;
      font-weight: 500;
    }

    .form-settings__section-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `
}

customElements.define('km-form-settings', FormSettings);
