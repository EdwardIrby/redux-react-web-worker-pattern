import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default { 
  input:  path.resolve(__dirname, '<your file relative to this file>'),
  plugins: [
    resolve(),
    commonjs(),
  ],
  /** Optional config to make bundle even smaller */
  // treeshake: {
  //   moduleSideEffects: false,
  //   propertyReadSideEffects: false,
  // },
  output: {
      format: 'cjs',
      file: path.resolve(__dirname, '<your output file relative to this file>'),
      sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false,
    },
}