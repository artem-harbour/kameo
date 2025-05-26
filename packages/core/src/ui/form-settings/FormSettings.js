import { LitElement, html, css } from 'lit';
import { SECTIONS } from './constants.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

export const FormSettingsComponentName = 'km-form-settings';

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
    const controlName = control.control?.name;

    const handlers = {
      input: () => this._renderInputControl({ control }),
      select: () => this._renderSelectControl({ control }),
      checkbox: () => this._renderCheckboxControl({ control }),
      component: () => this._renderComponentControl({ control }),
      default: () => {
        console.debug('Not supported control');
        return null;
      },
    };

    const renderHandler = handlers[controlName] ?? handlers.default;

    return html`
      <div class="form-settings__control">
        ${renderHandler()}
      </div>
    `;
  }

  _renderInputControl({ control }) {
    const { attr, label, description } = control;
    const { inputType } = control.control;
    const value = this._getAttrValue(attr);

    return html`
      <wa-input 
        .type=${inputType || 'text'}
        .value=${value}
        .label=${label}
        .hint=${description}
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
    const { key, attr, label, description } = control;
    const { options } = control.control;

    let value = this._getAttrValue(attr);

    if (value == null) {
      value = '';
    }

    // TODO: check this.
    // It is necessary to set the value asynchronously, otherwise it does not respond.
    const selectKey = `select-${key}`;
    setTimeout(() => {
      const select = this.shadowRoot.querySelector(`[data-key=${selectKey}]`);
      if (select) select.value = value;
    }, 0);

    return html`
      <wa-select
        data-key=${selectKey}
        .value=${value}
        .label=${label}
        .hint=${description}
        size="small"
        @change=${(event) => this._handleAttributeUpdate({
          event,
          control,
          value: event.target.value,
        })}>
        ${options.map(
          (item, index) => html`
            <wa-option .value=${item.value}>${item.label}</wa-option>
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
        ?checked=${value}
        .hint=${description}
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

  _renderComponentControl({ control }) {
    const { component } = control.control;

    return staticHtml`
      <${unsafeStatic(component)}
        .editor=${this.editor}
        .node=${this.node}
        .nodeView=${this.nodeView}
        .control=${control}
      >
      </${unsafeStatic(component)}>
    `;
  }

  _getAttrValue(attr) {
    return this.node.attrs[attr];
  }

  render() {
    if (!this.node || !this._settings) {
      return html`<div class="no-settings">Settings not found for this field.</div>`;
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
      gap: 20px;
    }

    .form-settings__section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-top: 20px;
      border-top: 2px solid rgba(0, 0, 0, 0.25);
    }

    .form-settings__section:first-child {
      padding-top: 0;
      border: 0;
    }

    .form-settings__section-label {
      font-size: 18px;
      font-weight: 500;
    }

    .form-settings__section-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `
}
