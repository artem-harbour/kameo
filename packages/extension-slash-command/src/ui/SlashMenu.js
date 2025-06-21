import { LitElement, html, css } from 'lit';

export const SlashMenuName = 'km-slash-menu';

export class SlashMenu extends LitElement {
  static properties = {
    items: {
      type: Array,
    },
    query: {
      type: String,
    },
    command: {
      type: Function,
    },
    _selectedIndex: { 
      type: Number,
      state: true
    },
  };

  constructor() {
    super();

    this.items = [];
    this.query = '';
    this.command = null;

    this._selectedIndex = 0;
  }

  onKeyDown({ event }) {
    const handlers = {
      ArrowUp: () => {
        this._upHandler();
        return true;
      },
      ArrowDown: () => {
        this._downHandler();
        return true;
      },
      Enter: () => {
        this._enterHandler();
        return true;
      },
      default: () => {
        return false;
      }
    };

    const handler = handlers[event.key] ?? handlers.default;

    return handler();
  }

  _upHandler() {
    this._selectedIndex = (this._selectedIndex + this.items.length - 1) % this.items.length;
  }

  _downHandler() {
    this._selectedIndex = (this._selectedIndex + 1) % this.items.length;
  }

  _enterHandler() {
    this._selectItem(this._selectedIndex);
  }

  _selectItem(index) {
    const item = this.items[index];

    if (item) {
      this.command(item);
    }
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('items')) {
      this._selectedIndex = 0;
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  _renderMenu() {
    if (!this.items.length) {
      return html`<div class="slash-menu__no-resultes">No results</div>`;
    }

    const groupedItems = Object.groupBy(this.items, ({ group }) => group);
    const selected = this.items[this._selectedIndex];

    return html`
      <div class="slash-menu__menu">
        ${Object.entries(groupedItems).map(([group, items]) => html`
          <div class="slash-menu__group">${group}</div>
          ${items.map((item, index) => html`
            <div 
              class="slash-menu__item ${item === selected ? 'slash-menu__item--selected' : ''}" 
              @click=${() => this._selectItem(index)}>
              <div class="slash-menu__item-title"><span>${item.title}</span></div>
            </div>
          `)}
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="slash-menu">
        ${this._renderMenu()}
      </div>
    `;
  }

  static styles = css`
    :host {
      --slash-menu-width: 240px;
      --slash-menu-max-height: 320px;

      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
    }

    .slash-menu {
      position: relative;
      display: flex;
      flex-direction: column;
      width: var(--slash-menu-width);
      max-height: var(--slash-menu-max-height);
      padding: 4px;
      background: #fff;
      border-radius: 6px;
      border: 1px solid #dfdfde;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
      overflow: auto;
      z-index: 10;
      user-select: none;
      white-space: nowrap;
      box-sizing: border-box;
      scrollbar-width: thin;
    }

    .slash-menu__menu {
      display: flex;
      flex-direction: column;
    }

    .slash-menu__item {
      position: relative;
      font-size: 15px;
      color: #37352f;
      line-height: 1.1;
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: default;
      user-select: none;
      box-sizing: border-box;
      transition: background-color 50ms ease-in-out;
    }

    .slash-menu__item:hover,
    .slash-menu__item--selected {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .slash-menu__item-title {
      display: inline-flex;
      overflow: hidden;
    }

    .slash-menu__item-title span {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .slash-menu__group {
      font-size: 13px;
      font-weight: bold;
      color: #37352f;
      line-height: 1.1;
      padding: 6px;
    }

    .slash-menu__no-resultes {
      font-size: 15px;
      padding: 6px;
    }
  `
}
