export const createToolbar = ({ 
  fields,
  container = '#kameo-toolbar', 
} = {}) => {
  const toolbarContainer = document.querySelector(container);
  const toolbar = document.createElement('km-toolbar-form-fields');
  toolbar.classList.add('kameo-toolbar');
  toolbar.fields = fields;
  toolbarContainer.append(toolbar);
};
