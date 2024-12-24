import { Node, mergeAttributes } from '@kameo/core';

export const Paragraph = Node.create({
  name: 'paragraph',
  
  group: 'block',

  content: 'inline*',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      { tag: 'p' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name);
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    };
  },
});
