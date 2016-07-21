import {WineCellarApp} from "./common/containers/application/application.container.ts";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HashLocationStrategy, LocationStrategy, APP_BASE_HREF} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {provide} from "@angular/core";
import "rxjs/add/operator/do";
import {store} from "./common/store";
import {HTTP_PROVIDERS} from "@angular/http";
import {instrumentStore} from "@ngrx/store-devtools";
import {provideStore} from "@ngrx/store";
import {useLogMonitor} from "@ngrx/store-log-monitor";


bootstrap(WineCellarApp, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: "/"}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    provideStore(store),
    instrumentStore({
        monitor: useLogMonitor({
            visible: false,
            position: "right"
        })
    }),
]);