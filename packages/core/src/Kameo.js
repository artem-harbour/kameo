import { Editor } from '@tiptap/core';
import { style } from './style.js';
import { Commands, FormDrop } from './extensions/index.js'
import { createStyleTag } from './utilities/index.js';
import { FormActionsPlugin, FormActionsPluginKey } from './plugins/FormActionsPlugin.js';
import { FormSettingsPlugin, FormSettingsPluginKey } from './plugins/FormSettingsPlugin.js';
import { defineComponent } from './helpers/defineComponent.js';
import { 
  FormActions,
  FormSettings,
  FormActionsComponentName,
  FormSettingsComponentName,
} from './ui/index.js';
import { FormManager } from './FormManager.js';

export class Kameo extends Editor {
  formManager;

  constructor({
    documentMode = 'edit',
    handlers = {},
    isHeadless = false,
    onSubmit = () => null,
    onSubmitted = () => null,
    ...opts
  } = {}) {
    const coreExtensions = [
      Commands,
      FormDrop.configure({
        handleDropOutside: opts.coreExtensionOptions?.formDrop?.handleDropOutside ?? false,
      }),
    ];

    const options = {
      documentMode,
      handlers,
      isHeadless,
      onSubmit,
      onSubmitted,
      ...opts,
      // to include kameo core extensions.
      extensions: [
        ...coreExtensions,
        ...(opts.extensions ? opts.extensions : []),
      ],
    };

    super(options);

    this.#init(options);
  }

  get documentMode() {
    return this.options.documentMode;
  }

  #init(options) {
    this.defineComponents();
    this.createFormManager();
    this.setHandlers();
    this.setDocumentMode(this.options.documentMode, { isInit: true });

    this.on('submit', this.options.onSubmit);
    this.on('submitted', this.options.onSubmitted);
  }

  createFormManager() {
    this.formManager = new FormManager({
      editor: this,
    });
  }

  setHandlers() {
    if (this.options.handlers?.submit) {
      this.submit = this.options.handlers.submit.bind(this);
    }
  }

  setDocumentMode(mode, { isInit = false } = {}) {
    const [editModeClass, viewModeClass] = ['kameo--edit-mode', 'kameo--view-mode'];
    
    const modes = {
      edit: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(true, false);
        if (!this.options.isHeadless) {
          this.registerPlugin(FormActionsPlugin({ editor: this }));
          this.registerPlugin(FormSettingsPlugin({ editor: this }));
          this.view.dom.classList.add(editModeClass);
          this.view.dom.classList.remove(viewModeClass);
        }
        this.emit('documentModeUpdate', {
          editor: this,
          mode: 'edit',
          isInit,
        });
      },
      view: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(false, false);
        if (!this.options.isHeadless) {
          this.unregisterPlugin(FormActionsPluginKey);
          this.unregisterPlugin(FormSettingsPluginKey);
          this.view.dom.classList.add(viewModeClass);
          this.view.dom.classList.remove(editModeClass);
        }
        this.emit('documentModeUpdate', {
          editor: this,
          mode: 'view',
          isInit,
        });
      },
    };

    let handleMode = modes[mode] ?? modes.edit;

    handleMode();
  }

  /**
   * Overridden method.
   */
  injectCSS() {
    if (this.options.injectCSS && document) {
      this.css = createStyleTag(style, this.options.injectNonce);
    }
  }

  /**
   * Overridden method.
   */
  prependClass() {
    this.view.dom.className = `kameo ${this.view.dom.className}`;
  }

  /**
   * Submit the form.
   */
  submit(props = {}) {
    return this.formManager.submit(props);
  }

  /**
   * Get the form data.
   */
  getFormData() {
    return this.formManager.getData();
  }

  /**
   * Get the document as JSON.
   */
  getJSON() {
    return super.getJSON();
  }

  /**
   * Helper method for broadcasting node events.
   */
  emitNodeEvent(nodeType, eventName, props = {}) {
    this.emit(`node:${nodeType}:${eventName}`, props);
    this.emit(`node:${eventName}`, props);
  }

  /**
   * Helper method for subscribing to node events.
   */
  onNodeEvent(nodeType, eventName, callback) {
    this.on(`node:${nodeType}:${eventName}`, callback);
    return this;
  }

  /**
   * Helper method for unsubscribing from node events.
   */
  offNodeEvent(nodeType, eventName, callback) {
    this.off(`node:${nodeType}:${eventName}`, callback);
    return this;
  }

  defineComponents() {
    if (this.options.isHeadless)  {
      return;
    }

    const components = {
      [FormActionsComponentName]: FormActions,
      [FormSettingsComponentName]: FormSettings,
    };

    Object.entries(components).forEach(([name, component]) => {
      defineComponent(name, component);
    });
  }
}
