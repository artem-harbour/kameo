export const createBaseForm = (kameo) => {
  const pos = kameo.state.doc.content.size;
  kameo
    .chain()
    .insertContentAt(pos, '<h1>Simple form</h1><p>This is a <b>simple</b> form</p>')
    .insertFormInputName(pos)
    .insertFormInputEmail(pos)
    .insertFormInputText(pos)
    .insertFormRating(pos)
    .insertFormSubmit(pos)
    .run();
};
