import {Injectable} from "@angular/core";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {AuthenticationService} from "../../authentication/services/authentication.service";
import {StockService} from "../../stock/services/stock.service";
@Injectable()
export class ApplicationSandbox {
    public isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);
    public isBusy$ = this.store.select(state => state.containers.application.isBusy);
    public account$ = this.store.select(state => state.data.authentication.account);

    constructor(private store: Store<ApplicationState>, private authenticationService: AuthenticationService,
                private stockService: StockService) {
    }

    public loadAuthentication(): void {
        this.authenticationService.checkInitialAuthentication();
    }

    public logout(): void {
        this.authenticationService.logout();
    }

    public loadWines(): void {
        this.stockService.load();
    }
}