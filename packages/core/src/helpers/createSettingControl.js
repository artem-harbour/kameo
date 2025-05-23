export const createSettingControl = (config = {}) => {
  if (!config.key) {
    throw new Error('Setting control must have a key');
  }

  const defaultConfig = {
    key: null,
    attr: null,
    control: 'input', // input | checkbox | select | component
    label: '',
    description: '',
    section: 'main',
    valueType: 'string',
    inputType: 'text', // only for 'input' control
    component: null,
    options: [], // only for 'select' control
    visible: () => true,
  };
  
  return {
    ...defaultConfig,
    ...config,
  };
};
