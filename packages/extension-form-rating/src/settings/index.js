import { kameoHelpers } from '@kameo/core';

const { createSettingControl } = kameoHelpers;

export const createFieldSettings = () => ({
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
    description: `A label that describes the rating to assistive devices`,
  }),
  max: createSettingControl({
    key: 'max',
    attr: 'max',
    label: 'Max',
    description: 'The highest rating to show',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  precision: createSettingControl({
    key: 'precision',
    attr: 'precision',
    label: 'Precision',
    description: 'The precision at which the rating will increase and decrease. For example, to allow half-star ratings, set this attribute to 0.5',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  readonly: createSettingControl({
    key: 'readonly',
    attr: 'readonly',
    label: 'Readonly',
    description: 'Makes the rating readonly',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Disables the rating',
    control: {
      name: 'checkbox',
    },
    section: 'state',
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
