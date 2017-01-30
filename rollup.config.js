
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import filesize from 'rollup-plugin-filesize'
import minify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'cjs',
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**'
    }),
    minify(),
    filesize(),
  ],
  exports: 'named',
  external: ['react']
}
