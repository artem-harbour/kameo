import { baseConfig } from '@kameo-shared/rollup-config/index.js';
import path from 'node:path';

import pkg from './package.json' with { type: 'json' };

export default baseConfig({ 
  input: 'src/index.js', 
  pkg,
  externalDependencies: false,
  copyOptions: {
    copyOnce: true,
    targets: [
      {
        src: path.resolve(import.meta.dirname, '../../node_modules/@shoelace-style/shoelace/dist/themes/light.css'),
        dest: path.resolve(import.meta.dirname, 'dist/themes'),
      },
      // {
      //   src: path.resolve(import.meta.dirname, '../../node_modules/@shoelace-style/shoelace/dist/assets'),
      //   dest: path.resolve(import.meta.dirname, 'dist')
      // },
    ],
  },
});
