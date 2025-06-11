import { Node } from '@kameo/core';

/**
 * The default document node which represents the top level node.
 */
export const Document = Node.create({
  name: 'doc',
  topNode: true,
  content: 'block+',
});
