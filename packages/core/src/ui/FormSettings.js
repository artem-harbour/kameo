import { LitElement, html, css } from 'lit';

export class FormSettings extends LitElement {
  static properties = {};

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="form-settings">

      </div>
    `;
  }

  static styles = css`
    :host {}
  `
}

customElements.define('km-form-settings', FormSettings);
