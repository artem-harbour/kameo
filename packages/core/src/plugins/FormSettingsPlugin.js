import { Plugin, PluginKey } from '@kameo/pm/state';

export const FormSettingsPluginKey = new PluginKey('FormSettings');

export class FormSettingsView {
  editor;

  view;

  formSettings;

  panelElement;

  constructor({
    editor, 
    view,
  }) {
    this.editor = editor;
    this.view = view;

    this.onOpenSettings = this.onOpenSettings.bind(this);
    this.onDocumentModeUpdate = this.onDocumentModeUpdate.bind(this);
    this.onPanelShow = this.onPanelShow.bind(this);
    this.onPanelAfterHide = this.onPanelAfterHide.bind(this);

    if (editor.documentMode === 'edit') {
      this.addSettings();
    }

    this.editor.on('openFormSettings', this.onOpenSettings);
    this.editor.on('documentModeUpdate', this.onDocumentModeUpdate);
  }

  addSettings() {
    this.panelElement = this.createPanel();
    this.formSettings = this.createSettings();
    this.formSettings.editor = this.editor;
    this.panelElement.append(this.formSettings);
    document.body.append(this.panelElement);
  }

  removeSettings() {
    this.panelElement?.removeEventListener('wa-show', this.onPanelShow);
    this.panelElement?.removeEventListener('wa-after-hide', this.onPanelAfterHide);
    this.panelElement?.remove();
    this.formSettings?.remove();
    this.panelElement = null;
    this.formSettings = null;
  }

  createPanel() {
    const panel = document.createElement('wa-drawer');
    panel.classList.add('km-form-settings-panel');
    panel.dataset.formSettingsPanel = '';
    panel.setAttribute('label', 'Settings');
    panel.setAttribute('with-header', '');
    panel.addEventListener('wa-show', this.onPanelShow);
    panel.addEventListener('wa-after-hide', this.onPanelAfterHide);
    return panel;
  }

  createSettings() {
    const settings = document.createElement('km-form-settings');
    settings.classList.add('km-form-settings');
    settings.dataset.formSettings = '';
    return settings;
  }

  openSettings({ editor, node, nodeView }) {
    if (!this.panelElement) return;
    this.panelElement.open = true;
    this.formSettings.editor = editor;
    this.formSettings.node = node;
    this.formSettings.nodeView = nodeView;
  }

  closeSettings() {
    if (!this.panelElement) return;
    this.panelElement.open = false;
  }

  onOpenSettings(event) {
    if (this.editor.documentMode !== 'edit') return;

    this.openSettings({
      editor: event.editor,
      node: event.node,
      nodeView: event.nodeView,
    });
  }

  onDocumentModeUpdate({ mode, isInit }) {
    if (isInit) return;

    const modes = {
      edit: () => {
        this.removeSettings();
        this.addSettings();
      },
      view: () => {
        this.removeSettings();
      },
    };

    const handleMode = modes[mode] ?? modes.edit;

    handleMode();
  }

  onPanelShow() {
    console.debug('onPanelShow');
  }
  
  onPanelAfterHide(event) {
    const isPanelEvent = event.target === this.panelElement;
    
    if (isPanelEvent) {
      this.formSettings.node = null;
      this.formSettings.nodeView = null;
    }
  }

  update(view, oldState) {}

  destroy() {
    this.removeSettings();
    this.editor.off('openFormSettings', this.onOpenSettings);
    this.editor.off('documentModeUpdate', this.onDocumentModeUpdate);
  }
}

export const FormSettingsPlugin = (options) => {
  return new Plugin({
    key: FormSettingsPluginKey,
    view: (view) => new FormSettingsView({ view, ...options }),
  });
};
