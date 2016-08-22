import {RouterModule} from "@angular/router";
import {AuthenticationContainer} from "./containers/authentication/authentication.container";
export const routes = [
    { path: "authentication", component: AuthenticationContainer}
];

export const routing = RouterModule.forChild(routes);
