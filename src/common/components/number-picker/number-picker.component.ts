import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
@Component({
    selector: "number-picker",
    styles: [require("./number-picker.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button type="button" class="btn btn-primary btn-sm" (click)="down()" [disabled]="amount === 0">
           <i class="fa fa-chevron-down"></i>
        </button>
       <span class="amount">{{amount}}</span>
        <button type="button" class="btn btn-primary btn-sm" (click)="up()">
            <i class="fa fa-chevron-up"></i>
        </button>
    `
})
export class NumberPicker {
    @Input() public amount: number;

    @Output() public setAmount = new EventEmitter<number>();

    public up(): void {
        this.setAmount.emit(this.amount + 1);
    }

    public down(): void {
        this.setAmount.emit(this.amount - 1);
    }
}