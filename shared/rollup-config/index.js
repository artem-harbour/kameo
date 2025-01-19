import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
import aliasPlugin from '@rollup/plugin-alias';

// https://www.npmjs.com/package/rollup-plugin-css-only
// https://github.com/jleeson/rollup-plugin-import-css
// https://github.com/shoelace-style/rollup-example/blob/master/rollup.config.js

export const baseConfig = ({
  input = 'src/index.js',
  pkg,
  alias = {},
  externalDependencies = true,
  externalPeerDependencies = true,
}) => {
  return {
    input,
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
    plugins: [
      autoExternal({
        packagePath: './package.json',
        dependencies: externalDependencies,
        peerDependencies: externalPeerDependencies,
      }),
      resolve(),
      commonjs(),
      aliasPlugin({
        entries: { ...alias },
      }),
    ],
  };
};
