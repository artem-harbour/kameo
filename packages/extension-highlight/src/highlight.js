import { Mark, markInputRule, markPasteRule, mergeAttributes } from '@kameo/core';

/**
 * Matches a highlight to a ==highlight== on input.
 */
export const inputRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))$/;

/**
 * Matches a highlight to a ==highlight== on paste.
 */
export const pasteRegex = /(?:^|\s)(==(?!\s+==)((?:[^=]+))==(?!\s+==))/g;

/**
 * This extension allows to highlight text.
 */
export const Highlight = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      multicolor: false,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }

    return {
      color: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-color') || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color}; color: inherit`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: 'mark' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      /**
       * Set a highlight mark.
       * @param attributes The highlight attributes.
       * @example editor.commands.setHighlight({ color: 'red' })
       */
      setHighlight: (attributes) => ({ commands }) => {
        return commands.setMark(this.name, attributes);
      },
      /**
       * Toggle a highlight mark.
       * @param attributes The highlight attributes.
       * @example editor.commands.toggleHighlight({ color: 'red' })
       */
      toggleHighlight: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes);
      },
      /**
       * Unset a highlight mark.
       * @example editor.commands.unsetHighlight()
       */
      unsetHighlight: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
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
