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
      component: 'km-form-settings-select',
    },
  }),
  label: createSettingControl({
    key: 'label',
    attr: 'label',
    label: 'Label',
    description: `The select's label`,
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The select's hint`,
  }),
  placeholder: createSettingControl({
    key: 'placeholder',
    attr: 'placeholder',
    label: 'Placeholder',
    description: 'Placeholder text to show as a hint when the select is empty',
  }),
  multiple: createSettingControl({
    key: 'multiple',
    attr: 'multiple',
    label: 'Multiple',
    description: 'Allows more than one option to be selected',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the select control',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: `The select's required attribute`,
    control: {
      name: 'checkbox',
    },
    section: 'validation',
  }),
  maxOptionsVisible: createSettingControl({
    key: 'maxOptionsVisible',
    attr: 'maxOptionsVisible',
    label: 'Max options visible',
    description: 'The maximum number of selected options to show when multiple is true',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'state',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The select's size`,
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
  appearance: createSettingControl({
    key: 'appearance',
    attr: 'appearance',
    label: 'Appearance',
    description: `The select's visual appearance`,
    control: {
      name: 'select',
      options: [
        { value: 'filled', label: 'Filled' },
        { value: 'outlined', label: 'Outlined' },
      ],
    },
    section: 'appearance',
  }),
  pill: createSettingControl({
    key: 'pill',
    attr: 'pill',
    label: 'Pill',
    description: 'Draws a pill-style select with rounded edges',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
  withClear: createSettingControl({
    key: 'withClear',
    attr: 'withClear',
    label: 'Clearable',
    description: 'Adds a clear button when the select is not empty',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
  placement: createSettingControl({
    key: 'placement',
    attr: 'placement',
    label: 'Placement',
    description: 'Controls whether and how text input is automatically capitalized as it is entered by the user',
    control: {
      name: 'select',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
      ],
    },
    section: 'appearance',
  }),
});
