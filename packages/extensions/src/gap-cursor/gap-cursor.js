import { Extension, callOrReturn, getExtensionField } from '@kameo/core';
import { gapCursor } from '@kameo/pm/gapcursor';

export const Gapcursor = Extension.create({
  name: 'gapCursor',

  addProseMirrorPlugins() {
    return [gapCursor()];
  },

  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage,
    };

    return {
      allowGapCursor: callOrReturn(getExtensionField(extension, 'allowGapCursor', context)) ?? null,
    };
  },
});
