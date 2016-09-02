import {RouterModule} from "@angular/router";
import {AboutPageContainer} from "./containers/about-page/about-page.container";
import {AuthenticatedGuard} from "../common/authenticated.guard";
export const routes = [
    { path: "about", component: AboutPageContainer, canActivate: [AuthenticatedGuard] }
];

export const routing = RouterModule.forChild(routes);
