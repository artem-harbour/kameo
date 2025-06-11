import '../text-style/index.js';

import { Extension } from '@kameo/core';

/**
 * This extension allows to set a font family for text.
 */
export const FontFamily = Extension.create({
  name: 'fontFamily',

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
          fontFamily: {
            default: null,
            parseHTML: (element) => element.style.fontFamily,
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) {
                return {};
              }

              return {
                style: `font-family: ${attributes.fontFamily}`,
              }
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      /**
       * Set the font family.
       * @param fontFamily The font family.
       * @example editor.commands.setFontFamily('Arial')
       */
      setFontFamily: fontFamily => ({ chain }) => {
        return chain().setMark('textStyle', { fontFamily }).run();
      },
      /**
       * Unset the font family.
       * @example editor.commands.unsetFontFamily()
       */
      unsetFontFamily: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontFamily: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
