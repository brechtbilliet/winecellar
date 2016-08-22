import {RouterModule} from "@angular/router";
import {AuthenticatedGuard} from "../common/authenticated.guard";
export const routes = [
    {path: "", redirectTo: "/stock", pathMatch: "full", canActivate: [AuthenticatedGuard]}
];
export const routing = RouterModule.forRoot(routes);
