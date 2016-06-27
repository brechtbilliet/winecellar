import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {StockPage} from "../../../stock/containers/stock-page/stock-page.container";
import {AboutPage} from "../../../about/containers/about-page/about-page.container";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Navbar} from "../../components/navbar/navbar.component";
import {Authentication} from "../../../authentication/containers/authentication/authentication.container";
import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {BusyHandlerService} from "../../services/busyHandler.service";
import {Spinner} from "../../components/spinner/spinner.component";
import {StockService} from "../../../stock/services/stock.service";
import {EditStockPage} from "../../../stock/containers/edit-stock-page/edit-stock-page.container";
import {AddStockPage} from "../../../stock/containers/add-stock-page/add-stock-page.container";
import {ApplicationSandbox} from "../../sandboxes/application.sandbox";
@Component({
    selector: "application",
    providers: [Title, AuthenticationService, BusyHandlerService, StockService, ApplicationSandbox],
    directives: [ROUTER_DIRECTIVES, Navbar, Authentication, Spinner],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    template: `
        <navbar [account]="account$|async" (logout)="logout()" [hidden]="!(isAuthenticated$|async)"></navbar>
        <authentication *ngIf="!(isAuthenticated$|async)"></authentication>
        <router-outlet *ngIf="isAuthenticated$|async"></router-outlet>
        <spinner [spin]="isBusy$|async"></spinner>
    `
})
@RouteConfig([
    {path: "/", name: "Root", redirectTo: ["MyWines"]},
    {path: "/stock", name: "MyWines", component: StockPage},
    {path: "/stock/add", name: "AddWine", component: AddStockPage},
    {path: "/stock/:id", name: "EditWine", component: EditStockPage},
    {path: "/about", name: "About", component: AboutPage}
])
export class WineCellarApp {
    public isAuthenticated$ = this.sb.isAuthenticated$.do((isAuthenticated: boolean) => {
        if (isAuthenticated) {
            this.sb.loadWines();
        }
    }).cache();

    public account$ = this.sb.account$;
    public isBusy$ = this.sb.isBusy$;

    constructor(private title: Title, public sb: ApplicationSandbox) {
        this.title.setTitle("Winecellar application");
        sb.loadAuthentication();
    }

    public logout(): void {
        this.sb.logout();
    }
}
