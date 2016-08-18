import {RouterModule} from "@angular/router";
import {Authentication} from "./containers/authentication/authentication.container";
import {UnauthenticatedGuard} from "../common/unauthenticated.guard";
export const routes = [
    { path: "authentication", component: Authentication, canActivate: [UnauthenticatedGuard]}
];

export const routing = RouterModule.forChild(routes);
