import { Extension } from '@kameo/core';
import { dropCursor } from '@kameo/pm/dropcursor';

/**
 * This extension allows to add a drop cursor to your editor.
 * A drop cursor is a line that appears when you drag and drop content
 * in-between nodes.
 */
export const Dropcursor = Extension.create({
  name: 'dropCursor',

  addOptions() {
    return {
      color: '#7c3aed',
      width: 3,
      class: undefined,
    };
  },

  addProseMirrorPlugins() {
    return [
      dropCursor(this.options),
    ];
  },
});
