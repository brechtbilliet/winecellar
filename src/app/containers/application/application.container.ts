import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {ApplicationSandbox} from "../../sandboxes/application.sandbox";
@Component({
    selector: "application",
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    providers: [Title],
    template: `
        <navbar [account]="account$|async" (logout)="logout()" [hidden]="!(isAuthenticated$|async)"></navbar>
        <authentication *ngIf="!(isAuthenticated$|async)"></authentication>
        <div [hidden]="!(isAuthenticated$|async)"><router-outlet></router-outlet></div>
        <spinner [spin]="isBusy$|async"></spinner>
        <ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>
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
        setTimeout(() => {sb.loadAuthentication()});
    }

    logout(): void {
        this.sb.logout();
    }
}