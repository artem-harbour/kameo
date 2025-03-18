export const createBaseForm = (kameo) => {
  const pos = kameo.state.doc.content.size;
  kameo
    .chain()
    .insertContentAt(pos, '<h1>Simple form</h1>')
    .insertFormInputName(pos)
    .insertFormInputEmail(pos)
    .insertFormInputText(pos)
    .insertFormSubmit(pos)
    .run();
};
