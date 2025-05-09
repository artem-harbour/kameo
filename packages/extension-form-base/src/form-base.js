import { Extension } from '@kameo/core';
import { FormDropPlugin } from './form-drop-plugin.js';

export const FormBase = Extension.create({
  name: 'formBase',

  addOptions() {
    return {
      droppable: true,
      handleDropOutside: false,
    };
  },

  addCommands() {
    return {
      insertFormElement: (typeName, pos, attrs = {}) => ({
        dispatch,
        tr,
        commands,
      }) => {
        if (dispatch) {
          tr.setMeta('addToHistory', false);

          const insertPos = tr.mapping.map(pos);

          return commands.insertContentAt(insertPos, {
            type: typeName,
            attrs,
          }, { updateSelection: false });
        }
        
        return true;
      },
    };
  },

  addProseMirrorPlugins() {
    const isDroppable = this.options.droppable && this.editor.documentMode === 'edit';

    return [
      ...(isDroppable
        ? [
          FormDropPlugin({
            editor: this.editor,
            handleDropOutside: this.options.handleDropOutside,
          }),
        ]
        : []),
    ];
  },
});
