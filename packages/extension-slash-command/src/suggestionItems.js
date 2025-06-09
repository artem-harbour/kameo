import { kameoHelpers } from "@kameo/core";

const { getRandomId } = kameoHelpers;

export const suggestionItems = [
  {
    title: 'Text',
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
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
    section: 'Form',
    command: ({ editor, range }) => {
      const pos = editor.view.state.selection.from;
      editor.chain().focus().deleteRange(range).insertFormSubmit(pos).run();
    },
  },
];
