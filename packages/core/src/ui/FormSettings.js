import { LitElement, html, css } from 'lit';

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
  };

  constructor() {
    super();
  }

  _updateAttributes(attrs) {
    this.editor.commands.command(({ tr }) => {
      const pos = this.nodeView?.getPos();

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

  _handleInput(event) {
    const { value } = event.target;
    this._updateAttributes({
      label: value,
    });
  }

  render() {
    console.log({
      editor: this.editor,
      node: this.node,
      nodeView: this.nodeView,
    });

    return html`
      <div class="form-settings">
        <div class="form-settings__settings">

          <!-- <input type="text" @input=${(event) => this._handleInput(event)}> -->
        </div>
      </div>
    `;
  }

  updated(changedProperties) {}

  static styles = css`
    :host {}

    .form-settings {}

    .form-settings__settings {}
  `
}

customElements.define('km-form-settings', FormSettings);
