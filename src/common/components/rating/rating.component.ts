import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from "angular2/core";
@Component({
    selector: "rating",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require("./rating.component.scss")],
    template: `
        <i class="fa fa-star rating foo" [class.fa-2x]="big" *ngFor="#i of [1,2,3,4,5]"
            [class.over]="overValue >= i" 
            [class.starred]="rating >= i" 
            (mouseover)="over(i)" 
            (mouseout)="out()" 
            (click)="update(i)"></i>
    `
})
export class Rating {
    @Input()
    public rating: number;

    @Input()
    public big: boolean;

    @Output()
    public setRate: EventEmitter<number>;

    public overValue: number;

    constructor() {
        this.setRate = new EventEmitter();
    }

    public update(value: number): void {
        this.setRate.emit(value);
    }

    public over(value: number): void {
        this.overValue = value;
    }

    public out(): void {
        this.overValue = 0;
    }
}