import {Component, EventEmitter, Output, Input, ChangeDetectionStrategy} from "@angular/core";
@Component({
    selector: "rating",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <i class="fa fa-star rating" [class.fa-2x]="big" *ngFor="let i of [1,2,3,4,5]"
            [class.over]="overValue >= i" 
            [class.starred]="rating >= i" 
            (mouseover)="over(i)" 
            (mouseout)="out()" 
            (click)="update(i)"></i>
    `
})
export class Rating {
    @Input() rating: number;
    @Input() big: boolean;
    @Output() setRate = new EventEmitter<number>();

    overValue: number;

    update(value: number): void {
        this.setRate.emit(value);
    }

    over(value: number): void {
        this.overValue = value;
    }

    out(): void {
        this.overValue = 0;
    }
}