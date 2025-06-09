// TODO: generate id, name
// description, section
export const suggestionItems = [
  {
    title: 'Text',
    description: 'Input with type text',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormInputText(from).run();
    },
  },
  {
    title: 'Name',
    description: 'Input with type text',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormInputName(from).run();
    },
  },
  {
    title: 'Email',
    description: 'Input with type email',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormInputEmail(from).run();
    },
  },
  {
    title: 'Number',
    description: 'Input with type email',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormInputNumber(from).run();
    },
  },
  {
    title: 'Date',
    description: 'Input with type date',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormInputDate(from).run();
    },
  },
  {
    title: 'Time',
    description: 'Input with type time',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormInputTime(from).run();
    },
  },
  {
    title: 'Textarea',
    description: 'Textarea',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormTextarea(from).run();
    },
  },
  {
    title: 'Checkbox',
    description: 'Checkbox',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormCheckbox(from).run();
    },
  },
  {
    title: 'Select',
    description: 'Select',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      const attrs = {
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
      editor.chain().focus().deleteRange(range).insertFormSelect(from, attrs).run();
    },
  },
  {
    title: 'Radio options',
    description: 'Radio options',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      const attrs = {
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
      editor.chain().focus().deleteRange(range).insertFormRadioOptions(from, attrs).run();
    },
  },
  {
    title: 'Radio buttons',
    description: 'Radio buttons',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      const attrs = {
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
      editor.chain().focus().deleteRange(range).insertFormRadioButtons(from, attrs).run();
    },
  },
  {
    title: 'Yes/No',
    description: 'Yes/No',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      const attrs = {
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
      editor.chain().focus().deleteRange(range).insertFormRadioButtons(from, attrs).run();
    },
  },
  {
    title: 'Signature',
    description: 'Signature',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormSignature(from).run();
    },
  },
  {
    title: 'Rating',
    description: 'Rating',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormRating(from).run();
    },
  },
  {
    title: 'Switch',
    description: 'Switch',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormSwitch(from).run();
    },
  },
  {
    title: 'Slider',
    description: 'Slider',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormSlider(from).run();
    },
  },
  {
    title: 'Submit',
    description: 'Submit',
    section: 'Form',
    command: ({ editor, range }) => {
      const { from } = editor.view.state.selection;
      editor.chain().focus().deleteRange(range).insertFormSubmit(from).run();
    },
  },
];
