import { Mark, mergeAttributes } from '@kameo/core';

/**
 * This extension allows to create underline text.
 */
export const Underline = Mark.create({
  name: 'underline',
  
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'u',
      },
      {
        style: 'text-decoration',
        consuming: false,
        getAttrs: (style) => (style.includes('underline') ? {} : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['u', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      /**
       * Set an underline mark.
       * @example editor.commands.setUnderline()
       */
      setUnderline: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      /**
       * Toggle an underline mark.
       * @example editor.commands.toggleUnderline()
       */
      toggleUnderline: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      /**
       * Unset an underline mark.
       * @example editor.commands.unsetUnderline()
       */
      unsetUnderline: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-u': () => this.editor.commands.toggleUnderline(),
      'Mod-U': () => this.editor.commands.toggleUnderline(),
    };
  },
});
