import {RouterModule} from "@angular/router";
import {AuthenticatedGuard} from "../common/authenticated.guard";
import {StockPage} from "./containers/stock-page/stock-page.container";
import {AddStockPage} from "./containers/add-stock-page/add-stock-page.container";
import {EditStockPage} from "./containers/edit-stock-page/edit-stock-page.container";
export const routes = [
    { path: "stock", component: StockPage, canActivate: [AuthenticatedGuard] },
    { path: "stock/add", component: AddStockPage, canActivate: [AuthenticatedGuard] },
    { path: "stock/:id", component: EditStockPage, canActivate: [AuthenticatedGuard] }
];

export const routing = RouterModule.forChild(routes);
