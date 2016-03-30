import {Component, ChangeDetectionStrategy} from "angular2/core";
@Component({
    selector: "main",
    styles: [require("./main.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content></ng-content>`
})
export class Main {}