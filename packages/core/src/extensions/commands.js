import * as commands from '../commands/index.js';
import { Extension } from '@tiptap/core';

export * from '../commands/index.js';

export const Commands = Extension.create({
  name: 'kameoCommands',

  addCommands() {
    return {
      ...commands,
    };
  },
});
