import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
@Component({
    selector: "number-picker",
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
export class NumberPickerComponent {
    @Input() amount: number;
    @Output() setAmount = new EventEmitter<number>();

    up(): void {
        this.setAmount.emit(this.amount + 1);
    }

    down(): void {
        this.setAmount.emit(this.amount - 1);
    }
}