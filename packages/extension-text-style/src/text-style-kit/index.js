import { Extension } from '@kameo/core';
import { BackgroundColor } from '../background-color/index.js';
import { Color } from '../color/index.js';
import { FontFamily } from '../font-family/index.js';
import { FontSize } from '../font-size/index.js';
import { LineHeight } from '../line-height/index.js';
import { TextStyle } from '../text-style/index.js';

export const TextStyleKit = Extension.create<TextStyleKitOptions>({
  name: 'textStyleKit',

  addExtensions() {
    const extensions = [];

    if (this.options.backgroundColor !== false) {
      extensions.push(BackgroundColor.configure(this.options.backgroundColor));
    }

    if (this.options.color !== false) {
      extensions.push(Color.configure(this.options.color));
    }

    if (this.options.fontFamily !== false) {
      extensions.push(FontFamily.configure(this.options.fontFamily));
    }

    if (this.options.fontSize !== false) {
      extensions.push(FontSize.configure(this.options.fontSize));
    }

    if (this.options.lineHeight !== false) {
      extensions.push(LineHeight.configure(this.options.lineHeight));
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle));
    }

    return extensions;
  },
});
