import '../text-style/index.js';

import { Extension } from '@kameo/core';

/**
 * This extension allows to color your text.
 */
export const Color = Extension.create({
  name: 'color',

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
          color: {
            default: null,
            parseHTML: (element) => element.style.color?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {}
              }

              return {
                style: `color: ${attributes.color}`,
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
       * Set the text color.
       * @param color The color to set.
       * @example editor.commands.setColor('red')
       */
      setColor: (color) => ({ chain }) => {
        return chain().setMark('textStyle', { color }).run();
      },
      /**
       * Unset the text color.
       * @example editor.commands.unsetColor()
       */
      unsetColor: () => ({ chain }) => {
        return chain().setMark('textStyle', { color: null }).removeEmptyTextStyle().run();
      },
    };
  },
});
