import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../actionTypes";

@Injectable()
export class CollapsableSidebarSandbox {
    public isCollapsed$: Observable<boolean> =
        this.store.select((state: ApplicationState) => state.containers.collapsableSidebar.isCollapsed);

    constructor(private store: Store<ApplicationState>) {
    }

    public toggleSidebar(): void {
        this.store.dispatch({type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
    }
}