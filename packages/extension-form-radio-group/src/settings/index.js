import { kameoHelpers } from '@kameo/core';

const { createSettingControl } = kameoHelpers;

export const createFieldSettings = () => ({
  name: createSettingControl({
    key: 'name',
    attr: 'name',
    label: 'Name',
    description: 'Name of the field',
  }),
  options: createSettingControl({
    key: 'options',
    attr: 'options',
    label: 'Options',
    description: 'Select options',
    control: {
      name: 'component',
      component: 'km-form-settings-radio-options',
    },
  }),
  label: createSettingControl({
    key: 'label',
    attr: 'label',
    label: 'Label',
    description: `The radio group's label`,
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The radio groups's hint`,
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the radio group and all child radios',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: `The radio group's required attribute`,
    control: {
      name: 'checkbox',
    },
    section: 'validation',
  }),
  appearance: createSettingControl({
    key: 'appearance',
    attr: 'appearance',
    label: 'Appearance',
    description: `The radio's visual appearance`,
    control: {
      name: 'select',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'button', label: 'Button' },
      ],
    },
    section: 'appearance',
  }),
  orientation: createSettingControl({
    key: 'orientation',
    attr: 'orientation',
    label: 'Orientation',
    description: `The orientation in which to show radio items`,
    control: {
      name: 'select',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
    },
    section: 'appearance',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The radio group's size`,
    control: {
      name: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'inherit', label: 'Inherit' },
      ],
    },
    section: 'appearance',
  }),
});
