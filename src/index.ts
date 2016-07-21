import {WineCellarApp} from "./common/containers/application/application.container.ts";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HashLocationStrategy, LocationStrategy, APP_BASE_HREF} from "@angular/common";
import "rxjs/add/operator/do";
import {store} from "./common/store";
import {HTTP_PROVIDERS} from "@angular/http";
import {instrumentStore} from "@ngrx/store-devtools";
import {provideStore} from "@ngrx/store";
import {useLogMonitor} from "@ngrx/store-log-monitor";
import {AppRoutes} from "./common/routes";
import {provideRouter} from "@angular/router";
import {provideForms} from "@angular/forms";
import {AuthenticatedGuard} from "./common/authenticated.guard";


bootstrap(WineCellarApp, [
    provideRouter(AppRoutes),
    HTTP_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: "/"},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideForms(),
    provideStore(store),
    AuthenticatedGuard,
    instrumentStore({
        monitor: useLogMonitor({
            visible: false,
            position: "right"
        })
    }),
])
.catch((err: any) => console.error(err));
