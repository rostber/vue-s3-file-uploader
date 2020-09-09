import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const browser = {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VueS3FileUploader',
    file: pkg.browser
  },
  plugins: [
    buble(),
    resolve({
      browser: true, jsnext: true, main: true
    }),
    commonjs()
  ]
}

const browserMin = {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'VueS3FileUploader',
    file: 'dist/vue-s3-file-uploader.umd.js'
  },
  plugins: [
    resolve({
      browser: true, jsnext: true, main: true
    }),
    commonjs(),
    buble(),
    uglify()
  ]
}

const nodeModules = {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'esm',
      file: pkg.module
    }
  ],
  plugins: [
  ]
}

export default [
  browser,
  browserMin,
  nodeModules
]
