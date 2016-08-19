import {RouterModule} from "@angular/router";
import {AuthenticationContainer} from "./containers/authentication/authentication.container";
import {UnauthenticatedGuard} from "../common/unauthenticated.guard";
export const routes = [
    { path: "authentication", component: AuthenticationContainer, canActivate: [UnauthenticatedGuard]}
];

export const routing = RouterModule.forChild(routes);
