import { Extension, isNodeSelection } from '@kameo/core';
import { Plugin, PluginKey } from '@kameo/pm/state';
import { Decoration, DecorationSet } from '@kameo/pm/view';

export const Selection = Extension.create({
  name: 'selection',

  addOptions() {
    return {
      className: 'selection',
    };
  },

  addProseMirrorPlugins() {
    const { editor, options } = this;

    return [
      new Plugin({
        key: new PluginKey('selection'),
        props: {
          decorations(state) {
            if (state.selection.empty || editor.isFocused || !editor.isEditable || isNodeSelection(state.selection)) {
              return null;
            }

            return DecorationSet.create(state.doc, [
              Decoration.inline(state.selection.from, state.selection.to, {
                class: options.className,
              }),
            ]);
          },
        },
      }),
    ];
  },
});
