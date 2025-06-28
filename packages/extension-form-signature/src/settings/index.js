import { kameoHelpers } from '@kameo/core';

const { createSettingControl } = kameoHelpers;

export const createFieldSettings = () => ({
  name: createSettingControl({
    key: 'name',
    attr: 'name',
    label: 'Name',
    description: 'Name of the field',
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The signatures's hint`,
  }),
  format: createSettingControl({
    key: 'format',
    attr: 'format',
    label: 'Format',
    description: '',
    control: {
      name: 'select',
      options: [
        { value: 'png', label: 'PNG' },
        { value: 'jpeg', label: 'JPEG' },
        { value: 'svg', label: 'SVG' },
      ],
    },
    section: 'main',
  }),
  opaque: createSettingControl({
    key: 'opaque',
    attr: 'opaque',
    label: 'Opaque background',
    description: 'Makes the background opaque white. The background is forced white opaque for jpeg format',
    control: {
      name: 'checkbox',
    },
    section: 'main',
  }),
});
