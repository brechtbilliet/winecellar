import {StockPage} from "../stock/containers/stock-page/stock-page.container";
import {AboutPage} from "../about/containers/about-page/about-page.container";
import {EditStockPage} from "../stock/containers/edit-stock-page/edit-stock-page.container";
import {AddStockPage} from "../stock/containers/add-stock-page/add-stock-page.container";
import {AuthenticatedGuard} from "./authenticated.guard";
export const AppRoutes = [
    { path: "", component: StockPage },
    { path: "stock", component: StockPage, canActivate: [AuthenticatedGuard] },
    { path: "stock/add", component: AddStockPage, canActivate: [AuthenticatedGuard] },
    { path: "stock/:id", component: EditStockPage, canActivate: [AuthenticatedGuard] },
    { path: "about", component: AboutPage, canActivate: [AuthenticatedGuard] }
];