// snippet from: https://github.com/ngrx/example-app/blob/master/src/app/util.ts
import {Action} from "@ngrx/store";
let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unqiue"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
}
