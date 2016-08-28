import {Subject, Observable} from "rxjs/Rx";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {enableBusy, disableBusy} from "../../statemanagement/actionCreators";

@Injectable()
export class BusyHandlerService {
    private activeCalls: number = 0;

    constructor(private store: Store<ApplicationState>) {
    }

    handle(obs: Observable<any>): void {
        let subject: Subject<any> = new Subject();
        obs.subscribe(subject);
        if (this.activeCalls === 0) {
            this.store.dispatch(enableBusy());
        }
        this.activeCalls++;
        subject.finally(() => {
            this.activeCalls--;
            if (this.activeCalls === 0) {
                this.store.dispatch(disableBusy());
            }
        }).subscribe();
    }
}