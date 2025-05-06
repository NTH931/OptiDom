// rollup.config.js
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'build/optidom.js', // use the compiled JS, not TS directly
  output: {
    file: 'dist/optidom.umd.js',
    format: 'umd',
    name: 'ignored',
    exports: 'none',
  },
  plugins: [terser()]
};