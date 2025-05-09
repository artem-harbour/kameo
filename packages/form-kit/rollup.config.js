import { baseConfig } from '@kameo-shared/rollup-config/index.js';

import pkg from './package.json' with { type: 'json' };

export default baseConfig({  input: 'src/index.js', pkg });
