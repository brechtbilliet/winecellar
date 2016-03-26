import {Component, ChangeDetectionStrategy} from "angular2/core";
@Component({
    selector: "main",
    styles: [require("./main.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div>
            <ng-content></ng-content>
        </div>
    `
})
export class Main {}