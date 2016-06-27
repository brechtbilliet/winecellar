import {Component} from "@angular/core";
import {CollapsableSidebarSandbox} from "../../sandboxes/collapsable-sidebar.sandbox";
@Component({
    selector: "collapsable-sidebar",
    providers: [CollapsableSidebarSandbox],
    styles: [require("./collapsable-sidebar.container.scss")],
    template: `
        <div class="collapsable-part" [class.is-collapsed]="isCollapsed$|async">
            <button class="btn btn-primary btn-collapsable" (click)="toggle()">
                <i class="fa" [class.fa-chevron-right]="isCollapsed$| async" 
                    [class.fa-chevron-left]="(isCollapsed$| async) === false"></i>
            </button>
            <ng-content *ngIf="(isCollapsed$| async) === false"></ng-content>
        </div>
    `
})
export class CollapsableSidebar {
    public isCollapsed$ = this.sandbox.isCollapsed$;

    constructor(public sandbox: CollapsableSidebarSandbox) {
    }

    public toggle(): void {
        this.sandbox.toggleSidebar();
    }
}