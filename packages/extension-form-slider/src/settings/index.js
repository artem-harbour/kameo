import { kameoHelpers } from '@kameo/core';

const { createSettingControl } = kameoHelpers;

export const createFieldSettings = () => ({
  id: createSettingControl({
    key: 'id',
    attr: 'id',
    label: 'Field ID',
    description: 'Unique field ID',
  }),
  name: createSettingControl({
    key: 'name',
    attr: 'name',
    label: 'Name',
    description: 'Name of the field',
  }),
  label: createSettingControl({
    key: 'label',
    attr: 'label',
    label: 'Label',
    description: 'The slider label',
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: 'The slider hint',
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the slider',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  min: createSettingControl({
    key: 'min',
    attr: 'min',
    label: 'Min',
    description: 'The minimum acceptable value of the slider',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  max: createSettingControl({
    key: 'max',
    attr: 'max',
    label: 'Max',
    description: 'The maximum acceptable value of the slider',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  step: createSettingControl({
    key: 'step',
    attr: 'step',
    label: 'Step',
    description: 'The interval at which the slider will increase and decrease',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  tooltip: createSettingControl({
    key: 'tooltip',
    attr: 'tooltip',
    label: 'Tooltip',
    description: 'The preferred placement of the slider tooltip',
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'none', label: 'None' },
      ],
    },
    section: 'appearance',
  }),
});
