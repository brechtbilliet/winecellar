import {StockPage} from "../stock/containers/stock-page/stock-page.container";
import {AboutPage} from "../about/containers/about-page/about-page.container";
import {EditStockPage} from "../stock/containers/edit-stock-page/edit-stock-page.container";
import {AddStockPage} from "../stock/containers/add-stock-page/add-stock-page.container";
export const AppRoutes = [
    { path: "", component: StockPage },
    { path: "stock", component: StockPage },
    { path: "stock/add", component: AddStockPage },
    { path: "stock/:id", component: EditStockPage },
    { path: "about", component: AboutPage }
];