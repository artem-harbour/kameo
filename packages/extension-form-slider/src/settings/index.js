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
    description: 'The slider label',
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: 'The slider hint',
  }),
  readonly: createSettingControl({
    key: 'readonly',
    attr: 'readonly',
    label: 'Readonly',
    description: 'Makes the slider a read-only field',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: 'Makes the slider a required field',
    control: {
      name: 'checkbox',
    },
    section: 'state',
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
  range: createSettingControl({
    key: 'range',
    attr: 'range',
    label: 'Range',
    description: 'Converts the slider to a range slider with two thumbs',
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
  minValue: createSettingControl({
    key: 'minValue',
    attr: 'minValue',
    label: 'minValue',
    description: 'The minimum value of a range selection. Used only when range attribute is set.',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  maxValue: createSettingControl({
    key: 'maxValue',
    attr: 'maxValue',
    label: 'maxValue',
    description: 'The maximum value of a range selection. Used only when range attribute is set.',
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
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The slider's size`,
    control: {
      name: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ],
    },
    section: 'appearance',
  }),
  orientation: createSettingControl({
    key: 'orientation',
    attr: 'orientation',
    label: 'Orientation',
    description: 'The orientation of the slider',
    control: {
      name: 'select',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
    },
    section: 'appearance',
  }),
  withTooltip: createSettingControl({
    key: 'withTooltip',
    attr: 'withTooltip',
    label: 'With tooltip',
    description: 'Draws a tooltip above the thumb when the control has focus or is dragged',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
  withMarkers: createSettingControl({
    key: 'withMarkers',
    attr: 'withMarkers',
    label: 'With markers',
    description: 'Draws markers at each step along the slider',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
  tooltipPlacement: createSettingControl({
    key: 'tooltipPlacement',
    attr: 'tooltipPlacement',
    label: 'Tooltip placement',
    description: `The placement of the tooltip in reference to the slider's thumb`,
    control: {
      name: 'select',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'right', label: 'Right' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'left', label: 'Left' },
      ],
    },
    section: 'appearance',
  }),
  tooltipDistance: createSettingControl({
    key: 'tooltipDistance',
    attr: 'tooltipDistance',
    label: 'Tooltip distance',
    description: `The distance of the tooltip from the slider's thumb`,
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'appearance',
  }),
  indicatorOffset: createSettingControl({
    key: 'indicatorOffset',
    attr: 'indicatorOffset',
    label: 'Indicator offset',
    description: `The starting value from which to draw the slider's fill, which is based on its current value.`,
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'appearance',
  }),
  autofocus: createSettingControl({
    key: 'autofocus',
    attr: 'autofocus',
    label: 'Autofocus',
    description: 'Tells the browser to focus the slider when the page loads or a dialog is shown',
    control: {
      name: 'checkbox',
    },
    section: 'other',
  }),
});
