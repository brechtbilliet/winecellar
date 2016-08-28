import {RouterModule} from "@angular/router";
import {AuthenticatedGuard} from "../common/authenticated.guard";
import {StockPageContainer} from "./containers/stock-page/stock-page.container";
import {AddStockPageContainer} from "./containers/add-stock-page/add-stock-page.container";
import {EditStockPageContainer} from "./containers/edit-stock-page/edit-stock-page.container";
export const routes = [
    { path: "stock", component: StockPageContainer, canActivate: [AuthenticatedGuard] },
    { path: "stock/add", component: AddStockPageContainer, canActivate: [AuthenticatedGuard] },
    { path: "stock/:id", component: EditStockPageContainer, canActivate: [AuthenticatedGuard] }
];

export const routing = RouterModule.forRoot(routes);
