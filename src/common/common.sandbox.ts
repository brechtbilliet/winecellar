import {Injectable} from "@angular/core";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {ToggleSidebar} from "../statemanagement/actions/containers/sidebar";

@Injectable()
export class CommonSandbox {
    isCollapsed$ = this.store.select(state => state.containers.collapsableSidebar.isCollapsed);

    constructor(private store: Store<ApplicationState>) {
    }

    toggleSidebar(): void {
        this.store.dispatch(new ToggleSidebar());
    }
}