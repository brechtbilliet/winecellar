import {Component} from "angular2/core";
@Component({
    selector: "main",
    styles: [require("./main.component.scss")],
    template: `<ng-content></ng-content>`
})
export class Main {}