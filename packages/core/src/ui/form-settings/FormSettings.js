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
  };

  constructor() {
    super();

    this.editor = null;
    this.node = null;
    this.nodeView = null;

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

  _handleAttributeUpdate({ data, event, value }) {
    const { attr } = data;

    this._updateAttributes({
      [attr]: value,
    });

    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('attribute-updated', {
        detail: { attr, value, node: this.node },
        bubbles: true,
        composed: true,
      }));
    });
  }

  _renderSettings() {
    return html`${Object.entries(SECTIONS).map(([_key, section]) => this._renderSection(section))}`;
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
        <div class="form-settings__section-title">${section.label}</div>
        <div class="form-settings__section-controls">
          ${settings.map(([_key, data]) => 
            this._renderControl({ data })
          )}
        </div>
      </div>
    `;
  }

  _renderControl({ data }) {
    const { control, controlType } = data;

    if (controlType === 'custom') {
      // TODO
      console.log('Handle custom control');
      return null;
    }

    const handlers = {
      input: () => this._renderInputField({ data }),
      default: () => {
        console.debug('Not supported type');
        return null;
      },
    };

    const renderHandler = handlers[control] ?? handlers.default;

    return html`
      <div class="form-settings__control">
        ${renderHandler()}
      </div>
    `;
  }

  _renderInputField({ data }) {
    const { attr, inputType, label, description } = data;
    const value = this.node.attrs[attr];

    return html`
      <wa-input 
        .type="${inputType || 'text'}"
        .value="${value}"
        .label="${label}"
        .hint="${description}"
        size="small"
        @input=${(event) => this._handleAttributeUpdate({ 
          data,
          event, 
          value: event.target.value,
        })}>
      </wa-input>
    `;
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

    .form-settings__section-title {
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
