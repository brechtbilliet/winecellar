import {RouterModule} from "@angular/router";
export const routes = [
    {path: "", redirectTo: "/stock", pathMatch: "full"}
];
export const routing = RouterModule.forRoot(routes);
