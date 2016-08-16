import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {Navbar} from "../../components/navbar/navbar.component";
import {Authentication} from "../../../authentication/containers/authentication/authentication.container";
import {AuthenticationService} from "../../../authentication/services/authentication.service";
import {BusyHandlerService} from "../../services/busyHandler.service";
import {Spinner} from "../../components/spinner/spinner.component";
import {StockService} from "../../../stock/services/stock.service";
import {ApplicationSandbox} from "../../sandboxes/application.sandbox";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
@Component({
    selector: "application",
    providers: [Title, AuthenticationService, BusyHandlerService, StockService, ApplicationSandbox],
    directives: [REACTIVE_FORM_DIRECTIVES, StoreLogMonitorComponent, ROUTER_DIRECTIVES, Navbar, Authentication, Spinner],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    template: `
        <navbar [account]="account$|async" (logout)="logout()" [hidden]="!(isAuthenticated$|async)"></navbar>
        <authentication *ngIf="!(isAuthenticated$|async)"></authentication>
        <div [hidden]="!(isAuthenticated$|async)"><router-outlet></router-outlet></div>
        <spinner [spin]="isBusy$|async"></spinner>
    `
})
export class WineCellarApp {
    account$ = this.sb.account$;
    isBusy$ = this.sb.isBusy$;
    isAuthenticated$ = this.sb.isAuthenticated$.do((isAuthenticated: boolean) => {
        if (isAuthenticated) {
            this.sb.loadWines();
        }
    }).cache();

    constructor(private title: Title, public sb: ApplicationSandbox) {
        this.title.setTitle("Winecellar application");
        sb.loadAuthentication();
    }

    logout(): void {
        this.sb.logout();
    }
}