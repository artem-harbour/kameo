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
    description: `The input's label`,
  }),
  hint: createSettingControl({
    key: 'hint',
    attr: 'hint',
    label: 'Hint',
    description: `The input's hint`,
  }),
  placeholder: createSettingControl({
    key: 'placeholder',
    attr: 'placeholder',
    label: 'Placeholder',
    description: 'Placeholder text to show as a hint when the input is empty',
  }),
  readonly: createSettingControl({
    key: 'readonly',
    attr: 'readonly',
    label: 'Readonly',
    description: 'Makes the input readonly',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  disabled: createSettingControl({
    key: 'disabled',
    attr: 'disabled',
    label: 'Disabled',
    description: 'Makes the input disabled',
    control: {
      name: 'checkbox',
    },
    section: 'state',
  }),
  required: createSettingControl({
    key: 'required',
    attr: 'required',
    label: 'Required',
    description: 'Makes the input a required field',
    control: {
      name: 'checkbox',
    },
    section: 'validation',
  }),
  size: createSettingControl({
    key: 'size',
    attr: 'size',
    label: 'Size',
    description: `The input's size`,
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
  appearance: createSettingControl({
    key: 'appearance',
    attr: 'appearance',
    label: 'Appearance',
    description: `The input's visual appearance`,
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
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
    description: 'Draws a pill-style input with rounded edges',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
  clearable: createSettingControl({
    key: 'clearable',
    attr: 'clearable',
    label: 'Clearable',
    description: 'Adds a clear button when the input is not empty',
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
  pattern: createSettingControl({
    key: 'pattern',
    attr: 'pattern',
    label: 'Pattern',
    description: 'A regular expression pattern to validate input against',
    section: 'validation',
  }),
  minlength: createSettingControl({
    key: 'minlength',
    attr: 'minlength',
    label: 'Minlength',
    description: 'The minimum length of input that will be considered valid',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  maxlength: createSettingControl({
    key: 'maxlength',
    attr: 'maxlength',
    label: 'Maxlength',
    description: 'The maximum length of input that will be considered valid',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  autocapitalize: createSettingControl({
    key: 'autocapitalize',
    attr: 'autocapitalize',
    label: 'Autocapitalize',
    description: 'Controls whether and how text input is automatically capitalized as it is entered by the user',
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'off', label: 'Off' },
        { value: 'none', label: 'None' },
        { value: 'on', label: 'On' },
        { value: 'sentences', label: 'Sentences' },
        { value: 'words', label: 'Words' },
        { value: 'characters', label: 'Characters' },
      ],
    },
    section: 'other',
  }),
  autocorrect: createSettingControl({
    key: 'autocorrect',
    attr: 'autocorrect',
    label: 'Autocorrect',
    description: `Indicates whether the browser's autocorrect feature is on or off`,
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'off', label: 'Off' },
        { value: 'on', label: 'On' },
      ],
    },
    section: 'other',
  }),
  autofocus: createSettingControl({
    key: 'autofocus',
    attr: 'autofocus',
    label: 'Autofocus',
    description: 'Indicates that the input should receive focus on page load',
    control: {
      name: 'checkbox',
    },
    section: 'other',
  }),
  enterkeyhint: createSettingControl({
    key: 'enterkeyhint',
    attr: 'enterkeyhint',
    label: 'Enterkeyhint',
    description: 'Used to customize the label or icon of the Enter key on virtual keyboards',
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'enter', label: 'Enter' },
        { value: 'done', label: 'Done' },
        { value: 'go', label: 'Go' },
        { value: 'next', label: 'Next' },
        { value: 'previous', label: 'Previous' },
        { value: 'search', label: 'Search' },
        { value: 'send', label: 'Send' },
      ],
    },
    section: 'other',
  }),
  spellcheck: createSettingControl({
    key: 'spellcheck',
    attr: 'spellcheck',
    label: 'Spellcheck',
    description: 'Enables spell checking on the input',
    control: {
      name: 'checkbox',
    },
    section: 'other',
  }),
  inputmode: createSettingControl({
    key: 'inputmode',
    attr: 'inputmode',
    label: 'Inputmode',
    description: 'Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices',
    control: {
      name: 'select',
      options: [
        { value: '', label: 'Default' },
        { value: 'none', label: 'None' },
        { value: 'text', label: 'Text' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'numeric', label: 'Numeric' },
        { value: 'tel', label: 'Tel' },
        { value: 'search', label: 'Search' },
        { value: 'email', label: 'Email' },
        { value: 'url', label: 'Url' },
      ],
    },
    section: 'other',
  }),

  // TODO: visible only for number type
  min: createSettingControl({
    key: 'min',
    attr: 'min',
    label: 'Min',
    description: `The input's minimum value (only applies to number input types)`,
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
    description: `The input's maximum value (only applies to number input types)`,
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
    description: 'Specifies the granularity that the value must adhere to (only applies to number input types)',
    control: {
      name: 'input',
      inputType: 'number',
    },
    section: 'validation',
  }),
  noSpinButtons: createSettingControl({
    key: 'noSpinButtons',
    attr: 'no-spin-buttons',
    label: 'No spin buttons',
    description: `Hides the browser's built-in increment/decrement spin buttons (only applies to number input types)`,
    control: {
      name: 'checkbox',
    },
    section: 'appearance',
  }),
});
