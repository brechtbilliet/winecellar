import {Store} from "@ngrx/store";
import {Component, ChangeDetectionStrategy} from "angular2/core";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../../actionTypes";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../../state/ApplicationState";
@Component({
    selector: "collapsable-sidebar",
    styles: [require("./collapsable-sidebar.container.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="collapsable-part" [class.is-collapsed]="isCollapsed|async">
            <button class="btn btn-primary btn-collapsable" (click)="toggleSidebar()">
                <i class="fa" [class.fa-chevron-right]="isCollapsed| async" [class.fa-chevron-left]="(isCollapsed| async) === false"></i>
            </button>
            <ng-content *ngIf="(isCollapsed| async) === false"></ng-content>
        </div>
    `
})
export class CollapsableSidebar {
    public isCollapsed: Observable<boolean>;

    constructor(private store: Store<ApplicationState>) {
        this.isCollapsed = store.select((state: ApplicationState) => state.containers.collapsableSidebar.isCollapsed);
    }

    public toggleSidebar(): void {
        this.store.dispatch({type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
    }
}