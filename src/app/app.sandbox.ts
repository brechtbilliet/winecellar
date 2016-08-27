import {Injectable} from "@angular/core";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {AuthenticationService} from "../authentication/services/authentication.service";
import {StockService} from "../stock/services/stock.service";
@Injectable()
export class AppSandbox {
    isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);
    isBusy$ = this.store.select(state => state.containers.application.isBusy);
    account$ = this.store.select(state => state.data.authentication.account);

    constructor(private store: Store<ApplicationState>, private authenticationService: AuthenticationService,
                private stockService: StockService) {
    }

    checkInitialAuthentication(): void {
        this.authenticationService.checkInitialAuthentication();
    }

    logout(): void {
        this.authenticationService.logout();
    }

    loadWines(): void {
        this.stockService.load();
    }
}