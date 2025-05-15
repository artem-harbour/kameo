import { kameoHelpers } from '@kameo/core';

export const createFieldSettings = () => {
  return {
    min: kameoHelpers.createSettingControl({
      key: 'min',
      attr: 'min',
      label: 'Min',
      description: `The input's minimum value`,
      control: 'input',
      inputType: 'number',
      section: 'validation',
    }),
    max: kameoHelpers.createSettingControl({
      key: 'max',
      attr: 'max',
      label: 'Max',
      description: `The input's maximum value`,
      control: 'input',
      inputType: 'number',
      section: 'validation',
    }),
    step: kameoHelpers.createSettingControl({
      key: 'step',
      attr: 'step',
      label: 'Step',
      description: 'Specifies the granularity that the value must adhere to',
      control: 'input',
      inputType: 'number',
      section: 'validation',
    }),
  };
};
