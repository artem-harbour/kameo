import { isiOS, getRenderedAttributes, mergeAttributes } from '@tiptap/core';
import { NodeSelection } from '@kameo/pm/state';
import { updateDOMAttributes } from './helpers/updateDOMAttributes.js';
import { FormActionsComponentName } from './ui/form-actions/index.js';

const wrapperClass = 'km-form-element-view';
const elementClass = 'km-form-element';

const customBooleans = [
  'loading',
  'pill',
  'clearable',
  'password-toggle',
  'password-visible',
  'no-spin-buttons',
  'autofocus',
  'spellcheck',
  'indeterminate',
];

const customElements = [
  'wa-input',
  'wa-textarea',
  'wa-checkbox',
  'wa-select',
  'wa-switch',
  'wa-slider',
  'wa-button',
];

export class FormElementView {
  editor;

  options;

  extension;

  node;

  decorations;

  innerDecorations;

  view;

  getPos;

  HTMLAttributes;

  root;

  element;

  tagName;

  isDragging = false;

  formActions = null;

  constructor(props, options) {
    this.editor = props.editor;
    this.options = {
      stopEvent: null,
      ignoreMutation: null,
      enableDrag: true,
      customBooleans: [],
      customElements: [],
      ...options,
    };
    this.extension = props.extension;
    this.node = props.node;
    this.decorations = props.decorations;
    this.innerDecorations = props.innerDecorations;
    this.view = props.view;
    this.HTMLAttributes = props.HTMLAttributes;
    this.tagName = props.tagName;
    this.getPos = props.getPos;

    this.onDocumentModeUpdate = this.onDocumentModeUpdate.bind(this);
    this.handleAction = this.handleAction.bind(this);

    this.editor.on('documentModeUpdate', this.onDocumentModeUpdate);

    this.mount(props, options);    
  }

  mount(props, options) {
    return;
  }

  get dom() {
    return this.root;
  }

  get contentDOM() {
    return null;
  }

  /**
   * Create view.
   */
  createView({ element }) {
    const wrapper = document.createElement('div');

    wrapper.classList.add(wrapperClass);
    wrapper.classList.add(`${wrapperClass}--${this.node.type.name}`);
    
    wrapper.dataset.nodeViewWrapper = '';

    const { documentMode } = this.editor;
    const { enableDrag } = this.options;

    if (enableDrag) {
      wrapper.addEventListener('dragstart', (e) => this.onDragStart(e));
    }

    if (enableDrag && documentMode === 'edit') {
      this.formActions = this.createFormActions();
      wrapper.prepend(this.formActions);
    }

    if (element) {
      wrapper.append(element);
    }

    return wrapper;
  }

  /**
   * Create element.
   */
  createElement() {
    const element = document.createElement(this.tagName);
    
    element.classList.add(elementClass);

    const attrs = mergeAttributes(this.options.HTMLAttributes, this.HTMLAttributes);
    const booleanAttrs = [...customBooleans, ...this.options.customBooleans];
    updateDOMAttributes(element, attrs, {
      customBooleans: booleanAttrs,
    });
    
    return element;
  }

  createFormActions() {
    const formActions = document.createElement(FormActionsComponentName);
    formActions.classList.add('km-form-actions', 'hide');
    formActions.dataset.formActions = '';
    const dragHandle = this.createDragHandle();
    dragHandle.setAttribute('slot', 'drag');
    formActions.append(dragHandle);
    formActions.addEventListener('action', this.handleAction);
    return formActions;
  }

  removeFormActions() {
    this.formActions?.removeEventListener('action', this.handleAction);
    this.formActions?.remove();
    this.formActions = null;
  }

  createDragHandle() {
    const dragHandle = document.createElement('div');
    dragHandle.classList.add('km-drag-handle');
    dragHandle.draggable = 'true';
    dragHandle.contentEditable = 'false';
    dragHandle.dataset.dragHandle = '';
    return dragHandle;
  }

  handleAction(event) {
    const { type } = event.detail;
    const actions = {
      add: () => {
        this.editor
          .chain()
          .command(({ commands }) => {
            const pos = this.getPos();
            if (typeof pos !== 'number') return;
            const insertPos = pos + this.node.nodeSize;
            commands.insertContentAt(insertPos, {
              type: 'text',
              text: ' ',
            });
            return true;
          })
          .run();
      },
      delete: () => {
        this.deleteNode();
      },
      duplicate: () => {
        this.editor
          .chain()
          .command(({ state, dispatch }) => {
            const tr = state.tr;
            const pos = this.getPos();
            if (typeof pos !== 'number') return;
            const insertPos = pos + this.node.nodeSize;
            tr.insert(insertPos, this.node.type.create(this.node.attrs));
            dispatch(tr);
            return true;
          })
          .run();
      },
      settings: () => {
        this.editor.emit('openFormSettings', {
          editor: this.editor,
          node: this.node,
          nodeView: this,
        });
      },
      default: () => {
        console.log('Not implemented.');
      },
    };

    const handler = actions[type] ?? actions.default;

    handler();    
  }

  onDocumentModeUpdate({ mode, isInit }) {
    if (isInit || !this.options.enableDrag) {
      return;
    }

    const modes = {
      edit: () => {
        this.removeFormActions();
        this.formActions = this.createFormActions();
        this.dom.prepend(this.formActions);
      },
      view: () => {
        this.removeFormActions();
      },
    };

    const handleMode = modes[mode] ?? modes.edit;

    handleMode();
  }

  onDragStart(event) {
    const { view } = this.editor;
    const target = event.target;

    // get the drag handle element
    // `closest` is not available for text nodes so we may have to use its parent
    const dragHandle = target.nodeType === 3
      ? target.parentElement?.closest('[data-drag-handle]')
      : target.closest('[data-drag-handle]');

    if (!this.dom || this.contentDOM?.contains(target) || !dragHandle) {
      return;
    }

    let x = 0;
    let y = 0;

    // calculate offset for drag element if we use a different drag handle element
    if (this.dom !== dragHandle) {
      const domBox = this.dom.getBoundingClientRect();
      const handleBox = dragHandle.getBoundingClientRect();

      // In React, we have to go through nativeEvent to reach offsetX/offsetY.
      const offsetX = event.offsetX ?? event.nativeEvent?.offsetX;
      const offsetY = event.offsetY ?? event.nativeEvent?.offsetY;

      x = handleBox.x - domBox.x + offsetX;
      y = handleBox.y - domBox.y + offsetY;
    }

    event.dataTransfer?.setDragImage(this.dom, x, y);

    const pos = this.getPos();

    if (typeof pos !== 'number') {
      return;
    }

    // we need to tell ProseMirror that we want to move the whole node
    // so we create a NodeSelection
    const selection = NodeSelection.create(view.state.doc, pos);
    const transaction = view.state.tr.setSelection(selection);

    view.dispatch(transaction);
  }

  /**
   * Update NodeView (otherwise the NodeView is recreated).
   */
  update(node, decorations, innerDecorations) {
    if (node.type !== this.node.type) {
      return false;
    }

    this.node = node;
    this.decorations = decorations;
    this.innerDecorations = innerDecorations;
    this.updateHTMLAttributes();

    const attrs = mergeAttributes(this.options.HTMLAttributes, this.HTMLAttributes);
    const booleanAttrs = [...customBooleans, ...this.options.customBooleans];
    updateDOMAttributes(this.element, attrs, {
      customBooleans: booleanAttrs,
    });

    return true;
  }

  updateHTMLAttributes() {
    const { extensionManager } = this.editor;
    const { attributes } = extensionManager;
    const extensionAttrs = attributes.filter((i) => i.type === this.node.type.name);
    this.HTMLAttributes = getRenderedAttributes(this.node, extensionAttrs);
  }

  stopEvent(event) {
    if (!this.dom) {
      return false;
    }

    if (typeof this.options.stopEvent === 'function') {
      return this.options.stopEvent({ event });
    }

    const target = event.target;
    const isInElement = this.dom.contains(target) && !this.contentDOM?.contains(target);

    // any event from child nodes should be handled by ProseMirror
    if (!isInElement) {
      return false;
    }

    const isDragEvent = event.type.startsWith('drag');
    const isDropEvent = event.type === 'drop';
    const isInput = [
      'INPUT', 
      'BUTTON', 
      'SELECT', 
      'TEXTAREA',
      ...customElements.map((i) => i.toUpperCase()),
      ...this.options.customElements.map((i) => i.toUpperCase()),
    ].includes(target.tagName) || target.isContentEditable;

    // any input event within node views should be ignored by ProseMirror
    if (isInput && !isDropEvent && !isDragEvent) {
      return true;
    }

    const { isEditable } = this.editor;
    const { isDragging } = this;
    const isDraggable = !!this.node.type.spec.draggable;
    const isSelectable = NodeSelection.isSelectable(this.node);
    const isCopyEvent = event.type === 'copy';
    const isPasteEvent = event.type === 'paste';
    const isCutEvent = event.type === 'cut';
    const isClickEvent = event.type === 'mousedown';

    // ProseMirror tries to drag selectable nodes
    // even if `draggable` is set to `false`
    // this fix prevents that
    if (!isDraggable && isSelectable && isDragEvent && event.target === this.dom) {
      event.preventDefault();
    }

    if (isDraggable && isDragEvent && !isDragging && event.target === this.dom) {
      event.preventDefault();
      return false;
    }

    // we have to store that dragging started
    if (isDraggable && isEditable && !isDragging && isClickEvent) {
      const dragHandle = target.closest('[data-drag-handle]');
      const isValidDragHandle = dragHandle && (this.dom === dragHandle || this.dom.contains(dragHandle));

      if (isValidDragHandle) {
        this.isDragging = true;

        document.addEventListener('dragend', () => {
          this.isDragging = false;
        }, { once: true });

        document.addEventListener('drop', () => {
          this.isDragging = false;
        }, { once: true });

        document.addEventListener('mouseup', () => {
          this.isDragging = false;
        }, { once: true });
      }
    }

    // these events are handled by prosemirror
    if (
      isDragging
      || isDropEvent
      || isCopyEvent
      || isPasteEvent
      || isCutEvent
      || (isClickEvent && isSelectable)
    ) {
      return false;
    }

    return true;
  }

  /**
   * Called when a DOM [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) or a selection change happens within the view.
   * @return `false` if the editor should re-read the selection or re-parse the range around the mutation
   * @return `true` if it can safely be ignored.
   */
  ignoreMutation(mutation) {
    if (!this.dom || !this.contentDOM) {
      return true;
    }

    if (typeof this.options.ignoreMutation === 'function') {
      return this.options.ignoreMutation({ mutation });
    }

    // a leaf/atom node is like a black box for ProseMirror
    // and should be fully handled by the node view
    if (this.node.isLeaf || this.node.isAtom) {
      return true;
    }

    // ProseMirror should handle any selections
    if (mutation.type === 'selection') {
      return false;
    }

    // try to prevent a bug on iOS and Android that will break node views on enter
    // this is because ProseMirror can’t preventDispatch on enter
    // this will lead to a re-render of the node view on enter
    if (
      this.dom.contains(mutation.target)
      && mutation.type === 'childList'
      && (isiOS()) // || isAndroid()
      && this.editor.isFocused
    ) {
      const changedNodes = [
        ...Array.from(mutation.addedNodes),
        ...Array.from(mutation.removedNodes),
      ];

      // we’ll check if every changed node is contentEditable
      // to make sure it’s probably mutated by ProseMirror
      if (changedNodes.every((node) => node.isContentEditable)) {
        return false;
      }
    }

    // we will allow mutation contentDOM with attributes
    // so we can for example adding classes within our node view
    if (this.contentDOM === mutation.target && mutation.type === 'attributes') {
      return true;
    }

    // ProseMirror should handle any changes within contentDOM
    if (this.contentDOM.contains(mutation.target)) {
      return false;
    }

    return true;
  }

  destroy() {
    this.options.destroy?.();
    this.dom.remove();
    this.removeFormActions();
    this.editor.off('documentModeUpdate', this.onDocumentModeUpdate);
  }

  /**
   * Update the attributes of the prosemirror node.
   */
  updateAttributes(attrs) {
    this.editor.commands.command(({ tr }) => {
      const pos = this.getPos();

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

  /**
   * Delete the node.
   */
  deleteNode() {
    const from = this.getPos();

    if (typeof from !== 'number') {
      return;
    }

    const to = from + this.node.nodeSize;
    this.editor.commands.deleteRange({ from, to });
  }
}
