import {Component, ChangeDetectionStrategy} from "angular2/core";

@Component({
    selector: "default-page",
    styles: [require("./default-page.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-content></ng-content>
    `
})
export class DefaultPage {}