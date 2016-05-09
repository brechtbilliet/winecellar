import {Injectable} from "@angular/core";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../actionTypes";

@Injectable()
export class CollapsableSidebarSandbox {
    public isCollapsed$ = this.store.select(state => state.containers.collapsableSidebar.isCollapsed);

    constructor(private store: Store<ApplicationState>) {
    }

    public toggleSidebar(): void {
        this.store.dispatch({type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
    }
}