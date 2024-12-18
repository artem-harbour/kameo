import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';

export const baseConfig = ({
  input = 'src/index.js',
  pkg,
}) => {
  let externalDependencies = true;

  if (pkg.name === '@kameo/core') {
    externalDependencies = false;
  }

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
        peerDependencies: true,
      }),
      resolve(),
      commonjs(),
    ],
  };
};
