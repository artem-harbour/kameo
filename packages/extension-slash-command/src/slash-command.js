import { Extension, kameoHelpers } from '@kameo/core';
import { Suggestion } from '@kameo/suggestion';
import { SlashMenu, SlashMenuName } from './ui/SlashMenu.js';

const { defineComponent } = kameoHelpers;

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },

  onCreate() {
    const { isHeadless } = this.editor.options;
    
    if (!isHeadless) {
      defineComponent(SlashMenuName, SlashMenu);
    }
  },
});
