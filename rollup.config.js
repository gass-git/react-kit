import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import url from '@rollup/plugin-url'

export default {
    input: 'src/main.js',
    output: {
        dir: 'dist/react-kit.js',
        format: 'cjs',
        sourcemap: true
    },
    external: [
        "react", "react-dom", "react-router-dom"
    ],
    plugins: [
        nodeResolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env', '@babel/preset-react']
        }),
        commonjs(),
        postcss({
            extensions: ['.css'],
            extract: true
        }),
        url({
            include: ['**/*.wav'],
            limit: 0,     
            fileName: '[name][extname]', 
            destDir: 'dist/assets'       
        })
    ]
}