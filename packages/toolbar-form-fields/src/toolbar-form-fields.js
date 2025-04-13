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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
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
      padding: 5px;
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
