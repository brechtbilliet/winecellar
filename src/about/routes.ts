import {RouterModule} from "@angular/router";
import {AboutPage} from "./containers/about-page/about-page.container";
import {AuthenticatedGuard} from "../common/authenticated.guard";
export const routes = [
    { path: "about", component: AboutPage, canActivate: [AuthenticatedGuard] }
];

export const routing = RouterModule.forChild(routes);
