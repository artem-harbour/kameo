import { LitElement, html, css } from 'lit';

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
      const attrs = {};

      const name = sourceField.name 
        ? `${sourceField.name}-${this._getRandomId()}`
        : null;
        
      if (name) attrs.name = name;
      
      const params = JSON.stringify({ 
        fieldType: sourceField.fieldType,
        attrs,
      });
      event.dataTransfer.setData('formField', params);
    }
  }

  _getRandomId = () => {
    return Math.floor(Math.random() * 0xffffffff).toString();
  };
  
  render() {
    return html`
      <div class="toolbar-form-fields">
        <div class="toolbar-form-fields__fields">
          ${this.fields.map(
            (item, index) => html`
              <div class="toolbar-form-fields__field" data-id=${item.id} draggable="true" @dragstart=${this._onDragStart}>
                <div class="toolbar-form-fields__field-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-icon lucide-grip"><circle cx="12" cy="5" r="1"/><circle cx="19" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="19" cy="19" r="1"/><circle cx="5" cy="19" r="1"/></svg>
                </div>
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
      display: grid;
      width: 100%;
      overflow: hidden;
    }
  
    .toolbar-form-fields {
      display: flex;
      width: 100%;
      padding: 6px 12px;
      overflow-x: auto;
      scrollbar-width: thin;
      box-sizing: border-box;
    }

    .toolbar-form-fields__fields {
      display: flex;
      gap: 10px;
      flex: 1;
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      padding: 4px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.25);
      box-sizing: border-box;
    }

    .toolbar-form-fields__field-icon svg {
      display: block;
      width: 100%;
      height: 100%;
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
