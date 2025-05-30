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
  format: createSettingControl({
    key: 'format',
    attr: 'format',
    label: 'Format',
    description: 'Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices',
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'png', label: 'PNG' },
        { value: 'jpeg', label: 'JPEG' },
        { value: 'svg', label: 'SVG' },
      ],
    },
    section: 'main',
  }),
});
