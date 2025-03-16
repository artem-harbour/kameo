import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class ToolbarFormFields extends LitElement {
  static properties = {
    fields: {
      type: Array,
    },
  };

  constructor() {
    super();
    this.fields = [];
  }

  _onDragStart(event) {
    event.dataTransfer.clearData('formField');
    
    const { id } = event.currentTarget.dataset;
    const sourceField = this.fields.find((i) => i.id === id);

    if (sourceField) {
      const params = JSON.stringify({ 
        fieldType: sourceField.fieldType,
        attrs: {},
      });
      event.dataTransfer.setData('formField', params);
    }
  }

  render() {
    return html`
      <div class="toolbar-form-fields">
        <div class="toolbar-form-fields__fields">
          ${this.fields.map(
            (item, index) => html`
              <div class="toolbar-form-fields__field" data-id=${item.id} draggable="true" @dragstart=${this._onDragStart}>
                <div class="toolbar-form-fields__field-icon"></div>
                <div class="toolbar-form-fields__field-title" .title=${item.title}>${item.title}</div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      display: flex;
      width: 100%;
      overflow: hidden;
    }
      
    .toolbar-form-fields {
      display: flex;
      flex: 1;
      padding: 6px 12px;
      overflow-x: auto;
      scrollbar-width: thin;
    }

    .toolbar-form-fields__fields {
      display: flex;
      gap: 10px;
    }

    .toolbar-form-fields__field {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      flex-shrink: 0;
      cursor: grab;
    }
      
    .toolbar-form-fields__field-icon {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.25);
    }
      
    .toolbar-form-fields__field-title {
      font-family: inherit;
      font-size: 13px;
      line-height: 1.1;
      white-space: nowrap;
    }
  `
}

customElements.define('km-toolbar-form-fields', ToolbarFormFields);
