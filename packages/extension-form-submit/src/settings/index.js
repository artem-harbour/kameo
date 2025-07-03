import { kameoHelpers } from '@kameo/core';

const { createSettingControl } = kameoHelpers;

export const createFieldSettings = () => ({
  label: createSettingControl({
    key: 'label',
    attr: 'label',
    label: 'Label',
    description: `The button's's label`,
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the button',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  variant: createSettingControl({
    key: 'variant',
    attr: 'variant',
    label: 'Variant',
    description: `The button's theme variant`,
    control: {
      name: 'select',
      options: [
        { value: 'neutral', label: 'Neutral' },
        { value: 'brand', label: 'Brand' },
        { value: 'success', label: 'Success' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
        { value: 'inherit', label: 'Inherit' },
      ],
    },
    section: 'appearance',
  }),
  appearance: createSettingControl({
    key: 'appearance',
    attr: 'appearance',
    label: 'Appearance',
    description: `The button's visual appearance`,
    control: {
      name: 'select',
      options: [
        { value: 'accent', label: 'Accent' },
        { value: 'filled', label: 'Filled' },
        { value: 'outlined', label: 'Outlined' },
        { value: 'plain', label: 'Plain' },
      ],
    },
    section: 'appearance',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The button's size`,
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
  pill: createSettingControl({
    key: 'pill',
    attr: 'pill',
    label: 'Pill',
    description: 'Draws a pill-style button with rounded edges.',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
});
