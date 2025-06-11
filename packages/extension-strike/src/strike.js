import { 
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from '@kameo/core';

/**
 * Matches a strike to a ~~strike~~ on input.
 */
export const inputRegex = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/;

/**
 * Matches a strike to a ~~strike~~ on paste.
 */
export const pasteRegex = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g;

/**
 * This extension allows to create strike text.
 */
export const Strike = Mark.create({
  name: 'strike',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 's',
      },
      {
        tag: 'del',
      },
      {
        tag: 'strike',
      },
      {
        style: 'text-decoration',
        consuming: false,
        getAttrs: (style) => (style.includes('line-through') ? {} : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['s', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      /**
       * Set a strike mark.
       * @example editor.commands.setStrike()
       */
      setStrike: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      /**
       * Toggle a strike mark.
       * @example editor.commands.toggleStrike()
       */
      toggleStrike: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      /**
       * Unset a strike mark.
       * @example editor.commands.unsetStrike()
       */
      unsetStrike: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-s': () => this.editor.commands.toggleStrike(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },
  
  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});
