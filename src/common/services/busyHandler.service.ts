import {CONTAINER_APPLICATION_DISABLE_BUSY_FLAG, CONTAINER_APPLICATION_ENABLE_BUSY_FLAG} from "../actionTypes";
import {Subject, Observable} from "rxjs/Rx";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {enableBusy, disableBusy} from "../actionCreators";

@Injectable()
export class BusyHandlerService {
    private activeCalls: number = 0;

    constructor(private store: Store<ApplicationState>) {
    }

    public handle(obs: Observable<any>): Observable<any> {
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
        return subject;
    }
}