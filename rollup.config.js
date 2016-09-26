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
class RollupLess {
    constructor(options){
        this.options = options;
    }
    resolveId(id, from){
        if (id.indexOf('.less') > -1){
            return null;
        }
    }
}

const rollupNG2 = (config) => new RollupNG2(config);
const rollupLess = (config) => new RollupLess(config);

export default {
    entry: 'out_es2015/bootstrap-prod.js',
    dest: 'out_treeshaked/bundle.js', // output a single application bundle
    sourceMap: false,
    format: "iife",
    external: ["src/styles/styles.less"],
    plugins: [
        commonjs({
            exclude: ['node_modules/lodash/**']
        }),

        rollupNG2(),
        rollupLess(),
        nodeResolve({
            jsnext: true, main: true
        })
    ]
};