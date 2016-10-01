import {NgModuleRef} from "@angular/core";
import {StoreModule, Store} from "@ngrx/store";

let appState: any;

export function hotModuleReplacement(bootloader: () => Promise<NgModuleRef<any>>,
                                     module: any) {
    let MODULE_REF: NgModuleRef<any>;
    let DATA = !!module.hot.data ?
        module.hot.data.state :
        undefined;
    if (document.readyState === "complete") {
        bootloader()
            .then((modRef: NgModuleRef<any>) => MODULE_REF = modRef)
            .then(() => console.timeEnd("bootstrap"));
    } else {
        document.addEventListener("DOMContentLoaded", () => {
            bootloader()
                .then((modRef: NgModuleRef<any>) => MODULE_REF = modRef)
                .then(() => console.timeEnd("bootstrap"));
        });
    }
    function getState(store: Store<any>) {
        let state: any;
        store.take(1).subscribe(s => state = s);
        return state;
    }

    module.hot.accept();
    module.hot.dispose((data: any) => {
        const store: Store<any> = MODULE_REF.injector.get(Store);
        appState = getState(store);
        (<any>Object).assign(data, {appState});
    });
}

export function provideStore(reducer: any) {
    if((<any>module).hot){
        return StoreModule.provideStore(reducer, appState);
    }
    return StoreModule.provideStore(reducer);
}