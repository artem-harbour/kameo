import { getFormData as _getFormData } from './helpers/getFormData.js';

export class FormManager {
  editor;

  constructor(props) {
    this.editor = props.editor;
  }

  submit(props = {}) {
    const formData = this.getFormData();

    const submitEvent = {
      formData,
      props: { ...props },
      setSubmitResult: ({ success, message = '', submitProps = {} }) => {
        this.editor.emit('submitted', {
          formData,
          success,
          message,
          props: { ...props, ...submitProps },
        });
      },
    };

    this.editor.emit('submit', submitEvent);

    return submitEvent;
  }

  getFormData() {
    return _getFormData(this.editor.state);
  }
}
