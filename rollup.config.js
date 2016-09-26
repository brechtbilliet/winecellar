import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

class RollupNG2 {
    constructor(options){
        this.options = options;
    }
    resolveId(id, from){
        if (id.startsWith('rxjs/')){
            return `${__dirname}/node_modules/rxjs-es/${id.replace('rxjs/', '')}.js`;
        }
    }
}
const rollupNG2 = (config) => new RollupNG2(config);

export default {
    entry: 'out_es2015/bootstrap/bootstrap-prod.js',
    dest: 'out_treeshaked/bundle.js', // output a single application bundle
    sourceMap: false,
    format: "iife",
    plugins: [
        commonjs({
            exclude: ['node_modules/lodash/**']
        }),
        rollupNG2(),
        nodeResolve({
            jsnext: true, main: true
        })
    ]
};