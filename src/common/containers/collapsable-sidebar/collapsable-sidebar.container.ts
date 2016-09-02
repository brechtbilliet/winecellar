import {Component, ViewEncapsulation} from "@angular/core";
import {CommonSandbox} from "../../common.sandbox";
@Component({
    selector: "collapsable-sidebar",
    styles: [require("./collapsable-sidebar.container.scss")],
    encapsulation: ViewEncapsulation.None,
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
export class CollapsableSidebarContainer {
    isCollapsed$ = this.sandbox.isCollapsed$;

    constructor(public sandbox: CommonSandbox) {
    }

    toggle(): void {
        this.sandbox.toggleSidebar();
    }
}