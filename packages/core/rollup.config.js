import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: 'json' };

export default {
  input: 'src/index.js',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
      interop: 'compat',
      sourcemap: false,
      exports: 'named',
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'es',
      sourcemap: false,
      exports: 'named',
    },
  ],
  external: [
    /@tiptap\/pm\/.*/,
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
    buildDelay: 200,
  },
  plugins: [
    resolve(),
    commonjs(),
  ],
};
