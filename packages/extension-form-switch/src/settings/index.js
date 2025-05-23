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
    description: `The switch's label`,
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The switch's hint`,
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the switch',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: 'Makes the switch a required field',
    control: {
      name: 'checkbox',
    },
    section: 'validation',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The rating's size`,
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'inherit', label: 'Inherit' },
      ],
    },
    section: 'appearance',
  }),
});
