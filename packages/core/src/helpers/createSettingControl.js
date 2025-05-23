export const createSettingControl = (config = {}) => {
  if (!config.key) {
    throw new Error('Setting control must have a key');
  }

  const defaultConfig = {
    key: null,
    attr: null,
    control: {
      name: 'input', // input | checkbox | select | component
      inputType: 'text', // only for 'input' control
      options: [], // only for 'select' control
      component: null, // only for 'component' control
    },
    label: '',
    description: '',
    section: 'main',
    visible: () => true,
  };
  
  return {
    ...defaultConfig,
    ...config,
  };
};
