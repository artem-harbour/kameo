export const createSettingControl = (config = {}) => {
  if (!config.key) {
    throw new Error('Setting control must have a key');
  }

  const defaultConfig = {
    key: null,
    attr: null,
    control: 'input', // input | checkbox | select
    label: '',
    description: '',
    section: 'main',
    valueType: 'string',
    inputType: 'text', // only for 'input' control
    controlType: 'attribute', // attribute | custom
    options: [], // only for 'select' control
    handler: () => null, // only for 'custom' controlType
    visible: () => true,
  };
  
  return {
    ...defaultConfig,
    ...config,
  };
};
