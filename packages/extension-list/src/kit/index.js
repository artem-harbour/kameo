import { Extension } from '@kameo/core';;
import { BulletList } from '../bullet-list/index.js';
import { ListItem } from '../item/index.js';
import { ListKeymap } from '../keymap/index.js';
import { OrderedList } from '../ordered-list/index.js';

export const ListKit = Extension.create({
  name: 'listKit',

  addExtensions() {
    const extensions = []

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options.bulletList));
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem));
    }

    if (this.options.listKeymap !== false) {
      extensions.push(ListKeymap.configure(this.options.listKeymap));
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options.orderedList));
    }

    return extensions;
  },
})
