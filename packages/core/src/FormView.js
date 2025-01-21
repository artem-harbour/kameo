
export class FormView {

  updateAttributes(attrs) {
    this.editor.commands.command(({ tr }) => {
      let pos = this.getPos();

      if (typeof pos !== 'number') {
        return false;
      }

      tr.setNodeMarkup(pos, undefined, {
        ...this.node.attrs,
        ...attrs,
      });

      return true;
    });
  }
}
