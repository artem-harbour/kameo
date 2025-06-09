import { kameoHelpers } from "@kameo/core";

const { getRandomId } = kameoHelpers;

export const suggestionItems = [
  {
    title: 'Text',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `text-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormInputText(pos, attrs).run();
    },
  },
  {
    title: 'Name',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `name-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormInputName(pos, attrs).run();
    },
  },
  {
    title: 'Email',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `email-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormInputEmail(pos, attrs).run();
    },
  },
  {
    title: 'Number',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `number-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormInputNumber(pos, attrs).run();
    },
  },
  {
    title: 'Date',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `date-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormInputDate(pos, attrs).run();
    },
  },
  {
    title: 'Time',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `time-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormInputTime(pos, attrs).run();
    },
  },
  {
    title: 'Textarea',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `textarea-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormTextarea(pos, attrs).run();
    },
  },
  {
    title: 'Checkbox',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = { 
        name: `checkbox-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormCheckbox(pos, attrs).run();
    },
  },
  {
    title: 'Select',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `select-${getRandomId()}`, 
        options: [
          {
            value: 'option-1',
            label: 'Option 1',
            disabled: false,
          },
          {
            value: 'option-2',
            label: 'Option 2',
            disabled: false,
          }
        ],
      };
      editor.chain().focus().deleteRange(range).insertFormSelect(pos, attrs).run();
    },
  },
  {
    title: 'Radio options',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `radio-options-${getRandomId()}`, 
        options: [
          {
            value: 'option-1',
            label: 'Option 1',
            disabled: false,
          },
          {
            value: 'option-2',
            label: 'Option 2',
            disabled: false,
          },
        ],
      };
      editor.chain().focus().deleteRange(range).insertFormRadioOptions(pos, attrs).run();
    },
  },
  {
    title: 'Radio buttons',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `radio-buttons-${getRandomId()}`, 
        options: [
          {
            value: 'option-1',
            label: 'Option 1',
            disabled: false,
          },
          {
            value: 'option-2',
            label: 'Option 2',
            disabled: false,
          },
        ],
      };
      editor.chain().focus().deleteRange(range).insertFormRadioButtons(pos, attrs).run();
    },
  },
  {
    title: 'Yes/No',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `yes-no-${getRandomId()}`, 
        options: [
          {
            value: 'yes',
            label: 'Yes',
            disabled: false,
          },
          {
            value: 'no',
            label: 'No',
            disabled: false,
          },
        ],
        orientation: 'horizontal',
      };
      editor.chain().focus().deleteRange(range).insertFormRadioButtons(pos, attrs).run();
    },
  },
  {
    title: 'Signature',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `signature-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormSignature(pos, attrs).run();
    },
  },
  {
    title: 'Rating',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `rating-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormRating(pos, attrs).run();
    },
  },
  {
    title: 'Switch',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `switch-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormSwitch(pos, attrs).run();
    },
  },
  {
    title: 'Slider',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      const attrs = {
        name: `slider-${getRandomId()}`, 
      };
      editor.chain().focus().deleteRange(range).insertFormSlider(pos, attrs).run();
    },
  },
  {
    title: 'Submit',
    group: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      editor.chain().focus().deleteRange(range).insertFormSubmit(pos).run();
    },
  },
];
