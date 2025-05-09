export const insertFormElement = 
  (typeName, pos, attrs = {}) => 
  ({ editor, tr, dispatch }) => {
    const { schema } = editor;

    if (dispatch) {
      tr.setMeta('addToHistory', false);

      const insertPos = tr.mapping.map(pos);
      const node = schema.nodes[typeName].create({ ...attrs }, null, null);
      tr.insert(insertPos, node);
    }

    return true;
};
