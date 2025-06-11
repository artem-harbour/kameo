import '../text-style/index.js';

import { Extension } from '@kameo/core';

/**
 * This extension allows to set the line-height for text.
 * @see https://www.tiptap.dev/api/extensions/line-height
 */
export const LineHeight = Extension.create({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      /**
       * Set the line height.
       * @param lineHeight The line height.
       * @example editor.commands.setLineHeight('1.5')
       */
      setLineHeight: (lineHeight) => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight }).run();
      },
      /**
       * Unset the line height.
       * @example editor.commands.unsetLineHeight()
       */
      unsetLineHeight: () => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight: null }).removeEmptyTextStyle().run();
      },
    }
  },
});
