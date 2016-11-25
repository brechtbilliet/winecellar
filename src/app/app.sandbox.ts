import {Injectable} from "@angular/core";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {AuthenticationService} from "../authentication/services/authentication.service";
import {StockService} from "../stock/services/stock.service";
import {RealTime} from "../common/realtime";
import {Wine} from "../stock/entities/Wine";
import {LOCALSTORAGE_AUTH} from "../configuration";
import {ClearAuthentication, SetAuthentication} from "../statemanagement/actions/data/autentication";
import {AddAllWines} from "../statemanagement/actions/data/wine";
@Injectable()
export class AppSandbox {
    isAuthenticated$ = this.store.select(state => state.data.authentication.isAuthenticated);
    isBusy$ = this.store.select(state => state.containers.application.isBusy);
    account$ = this.store.select(state => state.data.authentication.account);

    constructor(private store: Store<ApplicationState>, private authenticationService: AuthenticationService,
                private stockService: StockService, private realTime: RealTime) {
    }


    logout(): void {
        localStorage.removeItem(LOCALSTORAGE_AUTH);
        this.store.dispatch(new ClearAuthentication());
        this.realTime.disconnect();
    }

    checkInitialAuthentication(): void {
        let obj = this.authenticationService.checkInitialAuthentication();
        if (obj) {
            // evil fix for bug in @ngrx/dev-tools
            // https://github.com/ngrx/store-devtools/issues/25
            setTimeout(() => {
                this.store.dispatch(new SetAuthentication(obj));
            });
        }
    }


    loadWines(): void {
        this.stockService.load().subscribe((wines: Array<Wine>) => {
            this.store.dispatch(new AddAllWines(wines));
        });
    }

    connectRealTime(): void {
        this.realTime.connect();
    }
}