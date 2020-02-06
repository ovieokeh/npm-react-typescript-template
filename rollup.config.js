import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import css from 'rollup-plugin-css-only'
// import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    css({
      // Filename to write all styles to
      output: 'bundle.css',

      // Callback that will be called ongenerate with two arguments:
      // - styles: the contents of all style tags combined: 'body { color: green }'
      // - styleNodes: an array of style objects: [{lang: 'css', content: 'body { color: green }'}]
      output: function(styles, styleNodes) {
        writeFileSync('bundle.css', styles)
      },

      // Disable any style output or callbacks
      output: false,

      // Default behaviour is to write all styles to the bundle destination where .js is replaced by .css
      output: null
    }),
    url(),
    resolve(),
    typescript({
      objectHashIgnoreUnknownHack: true
    }),
    commonjs()
  ],
  external: ['react', 'react-dom']
}
