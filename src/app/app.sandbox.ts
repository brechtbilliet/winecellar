import {Injectable} from "@angular/core";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {AuthenticationService} from "../authentication/services/authentication.service";
import {StockService} from "../stock/services/stock.service";
import {RealTime} from "../common/realtime";
import {addAllWines, clearAuthentication, setAuthentication} from "../statemanagement/actionCreators";
import {Wine} from "../stock/entities/Wine";
import {LOCALSTORAGE_AUTH} from "../configuration";
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
        this.store.dispatch(clearAuthentication());
    }

    checkInitialAuthentication(): void {
        let obj = this.authenticationService.checkInitialAuthentication();
        if (obj) {
            // evil fix for bug in @ngrx/dev-tools
            // https://github.com/ngrx/store-devtools/issues/25
            setTimeout(() => {
                this.store.dispatch(setAuthentication(obj));
            });
        }
    }


    loadWines(): void {
        this.stockService.load().subscribe((wines: Array<Wine>) => {
            this.store.dispatch(addAllWines(wines));
        });
    }

    connectRealTime(): void {
        this.realTime.connect();
    }
}