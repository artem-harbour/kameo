import '../text-style/index.js';

import { Extension } from '@kameo/core';

/**
 * This extension allows to color your text.
 */
export const BackgroundColor = Extension.create({
  name: 'backgroundColor',

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
          backgroundColor: {
            default: null,
            parseHTML: element => element.style.backgroundColor?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
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
       * Set the text color.
       * @param backgroundColor The color to set.
       * @example editor.commands.setColor('red')
       */
      setBackgroundColor: (backgroundColor) => ({ chain }) => {
        return chain().setMark('textStyle', { backgroundColor }).run();
      },
      /**
       * Unset the text backgroundColor.
       * @example editor.commands.unsetBackgroundColor()
       */
      unsetBackgroundColor: () => ({ chain }) => {
        return chain().setMark('textStyle', { backgroundColor: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
