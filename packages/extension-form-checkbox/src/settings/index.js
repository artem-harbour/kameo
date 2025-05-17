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
    description: `The checkbox's label`,
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The checkbox's hint`,
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: 'Makes the checkbox a required field',
    control: 'checkbox',
    valueType: 'boolean',
    section: 'validation',
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the checkbox',
    control: 'checkbox',
    valueType: 'boolean',
    section: 'state',
  }),
  indeterminate: createSettingControl({
    key: 'indeterminate',
    attr: 'indeterminate',
    label: 'Indeterminate',
    description: 'Draws the checkbox in an indeterminate state',
    control: 'checkbox',
    valueType: 'boolean',
    section: 'state',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The checkbox's size`,
    control: 'select',
    options: [
      { value: '', label: 'Default' },
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
      { value: 'inherit', label: 'Inherit' },
    ],
    section: 'appearance',
  }),
});
