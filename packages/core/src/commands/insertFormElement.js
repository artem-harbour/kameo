export const insertFormElement = 
  (typeName, pos, attrs = {}) => 
  ({ tr, dispatch, commands }) => {
    if (dispatch) {
      tr.setMeta('addToHistory', false);

      const insertPos = tr.mapping.map(pos);

      return commands.insertContentAt(insertPos, {
        type: typeName,
        attrs,
      }, { updateSelection: false });
    }

    return true;
};
