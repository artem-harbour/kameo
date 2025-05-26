import { Editor } from '@tiptap/core';
import { style } from './style.js';
import { Commands, FormDrop } from './extensions/index.js'
import { createStyleTag } from './utilities/index.js';
import { getFormData } from './helpers/getFormData.js';
import { FormActionsPlugin, FormActionsPluginKey } from './plugins/FormActionsPlugin.js';
import { FormSettingsPlugin, FormSettingsPluginKey } from './plugins/FormSettingsPlugin.js';
import { defineComponent } from './helpers/defineComponent.js';
import { 
  FormActions, 
  FormSettings,  
  FormActionsComponentName, 
  FormSettingsComponentName 
} from './ui/index.js';

export class Kameo extends Editor {

  constructor(options = {}) {
    const coreExtensions = [
      Commands,
      FormDrop.configure({
        handleDropOutside: options.coreExtensionOptions?.formDrop?.handleDropOutside ?? false,
      }),
    ];

    const allOptions = {
      documentMode: 'edit',
      handlers: {},
      isHeadless: false,
      onSubmit: () => null,
      onSubmitted: () => null,
      ...options,
      // to include kameo core extensions.
      extensions: [
        ...coreExtensions,
        ...(options.extensions ? options.extensions : []),
      ],
    };
    
    super(allOptions);
    this.#init(allOptions);
  }

  get documentMode() {
    return this.options.documentMode;
  }
  
  #init(options) {
    this.submit = this.options.handlers?.submit ?? this.submit.bind(this);

    this.setDocumentMode(this.options.documentMode, { isInit: true });
    this.defineComponents();

    this.on('submit', this.options.onSubmit);
    this.on('submitted', this.options.onSubmitted);
  }

  setDocumentMode(mode, { isInit = false } = {}) {
    const [editModeClass, viewModeClass] = ['kameo--edit-mode', 'kameo--view-mode'];

    const modes = {
      edit: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(true, false);
        this.registerPlugin(FormActionsPlugin({ editor: this }));
        this.registerPlugin(FormSettingsPlugin({ editor: this }));
        this.view.dom.classList.add(editModeClass);
        this.view.dom.classList.remove(viewModeClass);
        this.emit('documentModeUpdate', {
          editor: this,
          mode: 'edit',
          isInit,
        });
      },
      view: () => {
        this.setOptions({ documentMode: mode });
        this.setEditable(false, false);
        this.unregisterPlugin(FormActionsPluginKey);
        this.unregisterPlugin(FormSettingsPluginKey);
        this.view.dom.classList.add(viewModeClass);
        this.view.dom.classList.remove(editModeClass);
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
   * Submit method.
   */
  submit(props = {}) {
    const formData = getFormData(this.state.doc);

    const submitEvent = {
      formData,
      timestamp: new Date(),
      props: { ...props },
      setSubmitResult: ({ success, message = '' }) => {
        this.emit('submitted', {
          formData,
          success,
          message,
          props: { ...props },
        });
      },
    };

    this.emit('submit', submitEvent);

    return submitEvent;
  }

  validate() {}

  /**
   * Get the document as JSON.
   */
  getJSON() {
    return super.getJSON();
  }

  /**
   * Get the document as HTML.
   */
  getHTML() {
    return super.getHTML();
  }

  /**
   * Helper method for broadcasting node events.
   */
  emitNodeEvent(nodeType, eventName, props = {}) {
    this.emit(`node:${nodeType}:${eventName}`, props);
    
    // general event.
    this.emit(`node:${eventName}`, props);
  }

  /**
   * Helper method for listening to node events.
   */
  onNodeEvent(nodeType, eventName, callback) {
    this.on(`node:${nodeType}:${eventName}`, callback);
    return this;
  }

  defineComponents() {
    defineComponent(FormActionsComponentName, FormActions);
    defineComponent(FormSettingsComponentName, FormSettings);
  }
}
