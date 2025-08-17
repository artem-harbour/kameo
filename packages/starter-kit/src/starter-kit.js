import { Extension } from '@kameo/core';
import { Blockquote } from '@kameo/extension-blockquote';
import { Bold } from '@kameo/extension-bold';
import { Document } from '@kameo/extension-document';
import { Heading } from '@kameo/extension-heading';
import { Italic } from '@kameo/extension-italic';
import { Link } from '@kameo/extension-link';
import { BulletList, ListItem, ListKeymap, OrderedList } from '@kameo/extension-list';
import { Paragraph } from '@kameo/extension-paragraph';
import { Strike } from '@kameo/extension-strike';
import { Text } from '@kameo/extension-text';
import { Underline } from '@kameo/extension-underline';
import { Dropcursor, Gapcursor, TrailingNode, UndoRedo } from '@kameo/extensions';

/**
 * The starter kit is a collection of essential editor extensions.
 * 
 * It's a good starting point for building your own editor.
 */
export const StarterKit = Extension.create({
  name: 'starterKit',

  addExtensions() {
    const extensions = [];

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options.bold));
    }

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options.blockquote));
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options.bulletList));
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options.document));
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options.dropcursor));
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options.gapcursor));
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options.heading));
    }

    if (this.options.undoRedo !== false) {
      extensions.push(UndoRedo.configure(this.options.undoRedo));
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options.italic));
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem));
    }

    if (this.options.listKeymap !== false) {
      extensions.push(ListKeymap.configure(this.options?.listKeymap));
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure(this.options?.link));
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options.orderedList));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options.paragraph));
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options.strike));
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options.text));
    }

    if (this.options.underline !== false) {
      extensions.push(Underline.configure(this.options?.underline));
    }

    if (this.options.trailingNode !== false) {
      extensions.push(TrailingNode.configure(this.options?.trailingNode));
    }

    return extensions;
  },
});
