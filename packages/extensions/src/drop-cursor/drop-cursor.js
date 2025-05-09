import { Extension } from '@kameo/core';
import { dropCursor } from '@kameo/pm/dropcursor';

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
