export class FormElementStore {
  editor;

  constructor(props) {
    this.editor = props.editor;
    this.elementViews = new Map();
  }

  getView(id) {
    return this.elementViews.get(id);
  }

  addView(id, elementView) {
    this.elementViews.set(id, elementView);
  }

  removeView(id) {
    this.elementViews.delete(id);
  }
}
