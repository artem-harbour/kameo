import { LitElement, html, css, nothing } from 'lit';
import SignaturePad from 'signature_pad';

// https://github.com/szimek/signature_pad
// https://github.com/szimek/signature_pad/issues/49

export const FormSignatureName = 'km-form-signature';

export class FormSignature extends LitElement {
  static properties = {
    value: {
      type: String,
    },
    hint: {
      type: String,
    },
    format: {
      type: String,
    },
    opaque: {
      type: Boolean,
    },
  };

  constructor() {
    super();

    this.canvas = null;
    this.signaturePad = null;

    this.format = 'png';
    this.opaque = false;

    this._onResizeCanvas = this._onResizeCanvas.bind(this);
    this._onEndStroke = this._onEndStroke.bind(this);
  }

  _initSignaturePad() {
    if (!this.canvas) {
      return;
    }

    // It's Necessary to use an opaque color when saving image as JPEG;
    // this option can be omitted if only saving as PNG or SVG
    const options = {
      ...(this.opaque || this.format === 'jpeg' ? { backgroundColor: 'rgb(255, 255, 255)' } : 'rgba(0,0,0,0)'),
    };

    this.signaturePad = new SignaturePad(this.canvas, { ...options });
  }

  // Adjust canvas coordinate space taking into account pixel ratio,
  // to make it look crisp on mobile devices.
  // This also causes canvas to be cleared.
  _resizeCanvas(dispatchEvent) {
    if (!this.canvas || !this.signaturePad) return;

    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    
    // This part causes the canvas to be cleared
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;
    this.canvas.getContext('2d').scale(ratio, ratio);
    this._clearPad(dispatchEvent);
  }

  _clearPad(dispatchEvent = true) {
    this.signaturePad.clear();
    if (dispatchEvent) {
      this._dispatchInputEvent({ value: null });
    }
  }

  _dispatchInputEvent({ value }) {
    const event = new CustomEvent('input', {
      detail: { value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _getPadValue() {
    const getters = {
      png: () => this.signaturePad.toDataURL(),
      jpeg: () => this.signaturePad.toDataURL('image/jpeg'),
      svg: () => this.signaturePad.toDataURL('image/svg+xml'),
      default: () => this.signaturePad.toDataURL(),
    };
    const valueGetter = getters[this.format] ?? getters.default;
    return this.signaturePad.isEmpty() ? null : valueGetter();
  }

  async _drawFromValue() {
    if (!this.signaturePad || !this.value) return;
    try {
      await this.signaturePad.fromDataURL(this.value);
    } catch (err) {
      console.error(err);
    }
  }

  _onResizeCanvas() {
    this._resizeCanvas();
  }

  _onEndStroke() {
    this._dispatchInputEvent({ 
      value: this._getPadValue(),
    });
  }

  _getElements() {
    this.canvas = this.shadowRoot.querySelector('.form-signature__canvas');
  }

  _attachPadEvents() {
    this.signaturePad?.addEventListener('endStroke', this._onEndStroke);
  }

  _removePadEvents() {
    this.signaturePad?.removeEventListener('endStroke', this._onEndStroke);
  }

  firstUpdated() {
    this._getElements();
    this._initSignaturePad();
    this._resizeCanvas(false);
    this._drawFromValue();
    this._attachPadEvents();
  }

  willUpdate(changedProperties) {
    const formatChanged = changedProperties.has('format');
    const opaqueChanged = changedProperties.has('opaque');
    const shouldUpdateBackground = (formatChanged || opaqueChanged);

    if (this.signaturePad && shouldUpdateBackground) {
      if (this.opaque || this.format === 'jpeg') {
        this.signaturePad.backgroundColor = 'rgb(255, 255, 255)';
      } else {
        this.signaturePad.backgroundColor = 'rgba(0,0,0,0)';
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // On mobile devices it might make more sense to listen to orientation change,
    // rather than window resize events.
    window.addEventListener('resize', this._onResizeCanvas);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removePadEvents();
    this.signaturePad = null;

    window.removeEventListener('resize', this._onResizeCanvas);
  }

  render() {
    return html`
      <div class="form-signature">
        <div class="form-signature__pad">
          <canvas class="form-signature__canvas"></canvas>
        </div>
        <div class="form-signature__footer">
          ${this.hint ? html`<div class="form-signature__description">${this.hint}</div>` : nothing}
          <div class="form-signature__actions">
            <div class="form-signature__clear" @click=${() => this._clearPad()}>Clear</div>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

      display: flex;
      flex-direction: column;
      width: 100%;
      height: 340px; 
      max-width: 700px;
    }

    .form-signature {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border: 1px solid #e8e8e8;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
      border-radius: 6px;
      padding: 12px;
      box-sizing: border-box;
    }

    .form-signature__pad {
      position: relative;
      flex: 1;
      border: 1px solid #f4f4f4;
      border-radius: 4px;
    }

    .form-signature__canvas {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
    }

    .form-signature__footer {
      display: flex;
      flex-direction: column;
    }

    .form-signature__description {
      font-size: 12px;
      color: #c3c3c3;
      line-height: 1.2;
      text-align: center;
      margin-top: 6px;
    }

    .form-signature__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 6px;
    }

    .form-signature__clear {
      font-size: 14px;
      color: #37352f;
      line-height: 1.2;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 70px;
      height: 28px;
      padding: 0px 10px;
      border-radius: 6px;
      cursor: pointer;
      user-select: none;
      box-sizing: border-box;
      border: 1px solid rgba(0, 0, 0, 0.25);
      transition: background-color 50ms ease-in-out;
    }

    .form-signature__clear:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `
}
