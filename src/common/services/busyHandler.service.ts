import {Observable, Subject} from "rxjs";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {CONTAINER_APPLICATION_DISABLE_BUSY_FLAG, CONTAINER_APPLICATION_ENABLE_BUSY_FLAG} from "../actionTypes";
import {Injectable} from "angular2/core";

@Injectable()
export class BusyHandlerService {
    private activeCalls: number = 0;

    constructor(private store: Store<ApplicationState>) {
    }

    public handle(obs: Observable<any>): Observable<any> {
        let subject: Subject<any> = new Subject();
        obs.subscribe(subject);
        if (this.activeCalls === 0) {
            this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        }
        this.activeCalls++;
        subject.finally(() => {
            this.activeCalls--;
            if (this.activeCalls === 0) {
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
            }
        }).subscribe();
        return subject;
    }
}