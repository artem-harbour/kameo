import { Kameo, kExtensions } from '@kameo/core';

export const initKameo = ({
  element,
}) => {
  new Kameo({
    element,
    extensions: [
      ...Object.values(kExtensions),
    ],
    content: '<p>Kameo World!</p>',
    injectCSS: false,
  })
};
