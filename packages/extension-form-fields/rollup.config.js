import { baseConfig } from '@kameo-shared/rollup-config/index.js';
import { fileURLToPath, URL } from 'node:url';

import pkg from './package.json' with { type: 'json' };

export default baseConfig({ 
  input: 'src/index.js', 
  pkg,
  alias: {
    '@base': fileURLToPath(new URL('./src/base', import.meta.url)),
  },
});
