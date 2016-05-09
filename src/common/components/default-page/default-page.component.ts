import {Component} from "angular2/core";

@Component({
    selector: "default-page",
    styles: [require("./default-page.component.scss")],
    template: `<ng-content></ng-content>`
})
export class DefaultPage {}