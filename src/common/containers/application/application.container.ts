import {Store} from "@ngrx/store";
import {AddWinePage} from "../../../stock/containers/add-wine-page/add-wine-page.container";
import {MyWinesPage} from "../../../stock/containers/my-wines-page/my-wines-page.container";
import {AboutPage} from "../../../about/containers/about-page/about-page.container";
import {AuthenticationEndpoint} from "../../../authentication/endpoints/AuthenticationEndpoint";
import {Navbar} from "../../components/navbar/navbar.component";
import {Spinner} from "../../components/spinner/spinner.component";
import {EditWinePage} from "../../../stock/containers/edit-wine-page/edit-wine-page.container";

import {Component, ViewEncapsulation, ChangeDetectionStrategy} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {Observable} from "rxjs/Observable";
import {LOCALSTORAGE_AUTH} from "../../../config";
import {DATA_AUTHENTICATION_SET_AUTHENTICATION} from "../../actionTypes";
import "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {ApplicationState} from "../../state/ApplicationState";
import {Account} from "../../../authentication/types/Account";
import {Authentication} from "../../../authentication/components/authentication/authentication.component";
import {Title} from "angular2/src/platform/browser/title";

@Component({
    selector: "application",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AuthenticationEndpoint, Title],
    directives: [ROUTER_DIRECTIVES, Navbar, Spinner, Authentication],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    template: `
        <navbar (logout)="logout()" 
            [account]="account$|async"
            *ngIf="isAuthenticated$|async"></navbar>
        <authentication *ngIf="!(isAuthenticated$|async)"></authentication>
        <router-outlet *ngIf="isAuthenticated$|async"></router-outlet>
        <spinner [spin]="isBusy$ | async"></spinner>
  `
})
@RouteConfig([
    {path: "/", name: "Root", redirectTo: ["/stock"]},
    {path: "/stock", name: "MyWines", component: MyWinesPage},
    {path: "/stock/add", name: "AddWine", component: AddWinePage},
    {path: "/stock/:id", name: "EditWine", component: EditWinePage},
    {path: "/about", name: "About", component: AboutPage}
])
export class WineCellarApp {
    public isAuthenticated$: Observable<boolean>;
    public account$: Observable<Account>;
    public isBusy$: Observable<boolean>;

    constructor(private store: Store<ApplicationState>,
                private endpoint: AuthenticationEndpoint,
                private title: Title) {
        this.isAuthenticated$ = this.store.select((item: ApplicationState) => item.data.authentication.isAuthenticated);
        this.account$ = this.store.select((item: ApplicationState) => item.data.authentication.account);
        this.isBusy$ = this.store.select((item: ApplicationState) => item.containers.application.isBusy);

        let localStorageObj: string = window.localStorage.getItem(LOCALSTORAGE_AUTH);
        if (localStorageObj) {
            this.store.dispatch({
                type: DATA_AUTHENTICATION_SET_AUTHENTICATION,
                payload: JSON.parse(localStorageObj)
            });
        }
        this.title.setTitle("Winecellar application")
    }

    public logout(): void {
        this.endpoint.logout();
    }
}
