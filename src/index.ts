import {WineCellarApp} from "./common/containers/application/application.container.ts";
import {bootstrap} from "angular2/platform/browser";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from "angular2/router";
import {provide} from "angular2/core";
import {store} from "./common/store";
import {provideStore, usePostMiddleware, usePreMiddleware, Middleware} from "@ngrx/store";
import "rxjs/add/operator/do";

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
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provideStore(store),
    usePreMiddleware(actionLog),
    usePostMiddleware(stateLog)
]);