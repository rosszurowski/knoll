
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import filesize from 'rollup-plugin-filesize'
import minify from 'rollup-plugin-uglify'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'Knoll',
  plugins: [
    eslint(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ["es2015", { "modules": false }],
        "stage-0",
        "react"
      ],
      plugins: [
        "external-helpers",
        "transform-class-properties"
      ]
    }),
    minify(),
    filesize(),
  ],
  exports: 'named',
  external: ['react']
}
