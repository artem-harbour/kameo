import { Extension } from '@kameo/core';

export const FormBase = Extension.create({
  name: 'formBase',

  addOptions() {
    return {};
  },

  addCommands() {
    return {
      insertFormField: (typeName, pos, attrs = {}) => ({
        dispatch,
        tr,
        commands,
      }) => {
        if (dispatch) {
          let posMapped = tr.mapping.map(pos);

          return commands.insertContentAt(posMapped, {
            type: typeName,
            attrs,
          }, { updateSelection: false });
        }
        
        return true;
      },
    };
  },
});
