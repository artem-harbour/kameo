import { Extension } from '@kameo/core';
import { dropCursor } from '@tiptap/pm/dropcursor';

export const Dropcursor = Extension.create({
  name: 'dropCursor',

  addOptions() {
    return {
      color: 'currentColor',
      width: 1,
      class: undefined,
    };
  },

  addProseMirrorPlugins() {
    return [
      dropCursor(this.options),
    ];
  },
});
