import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation, OnDestroy} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {AboutPage} from "../../../about/containers/about-page/about-page.container";
import {EditStockPage} from "../../../stock/containers/edit-stock-page/edit-stock-page.container";
import {AddStockPage} from "../../../stock/containers/add-stock-page/add-stock-page.container";
import {StockPage} from "../../../stock/containers/stock-page/stock-page.container";
import {Navbar} from "../../components/navbar/navbar.component";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {Spinner} from "../../components/spinner/spinner.component";
import {Authentication} from "../../../authentication/containers/authentication/authentication.container";
import {BusyHandlerService} from "../../services/busyHandler.service";
import {AuthenticationResource} from "../../../authentication/resources/authentication.resource";
import {WineResource} from "../../../stock/resources/wine.resource";
import {ApplicationSandbox} from "../../sandboxes/application.sandbox";
import {Subscription} from "rxjs/Subscription";
@Component({
    selector: "application",
    providers: [Title, ApplicationSandbox, AuthenticationResource, WineResource, BusyHandlerService],
    directives: [ROUTER_DIRECTIVES, Navbar, Spinner, Authentication],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    template: `
        <navbar [account]="account$|async" (logout)="logout()" *ngIf="isAuthenticated$|async"></navbar>
        <authentication *ngIf="!(isAuthenticated$|async)"></authentication>
        <router-outlet *ngIf="(isAuthenticated$|async)"></router-outlet>
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
export class WineCellarApp implements OnDestroy{
    public isAuthenticated$ = this.sandbox.isAuthenticated$;
    public account$ = this.sandbox.account$;
    public isBusy$ = this.sandbox.isBusy$;
    private subscriptions: Array<Subscription> = [];

    constructor(public sandbox: ApplicationSandbox, private title: Title) {
        this.title.setTitle("Winecellar application");
        this.sandbox.loadAuthentication();
        let subscription: Subscription = this.sandbox.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.sandbox.loadWines();
            }
        });
        this.subscriptions.push(subscription);
    }

    public logout(): void {
        this.sandbox.logout();
    }
    
    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
