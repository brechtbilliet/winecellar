import {provide} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "angular2/router";
import {provideStore, usePostMiddleware, usePreMiddleware, Middleware} from "@ngrx/store";

import {WineCellarApp} from "./common/containers/application/application.container";
import {store} from "./common/store";

const actionLog: Middleware = (action: any) => {
    return action.do((val: any) => {
        console.warn("DISPATCHED ACTION: ", val);
    });
};
const stateLog: Middleware = (state: any) => {
    return state.do((val: any) => {
        console.info("NEW STATE: ", val);
    });
};

bootstrap(WineCellarApp, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: "/"}),
    provideStore(store),
    usePreMiddleware(actionLog),
    usePostMiddleware(stateLog),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);