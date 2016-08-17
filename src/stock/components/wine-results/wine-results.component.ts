import {Component, Output, Input, ChangeDetectionStrategy, EventEmitter} from "@angular/core";
import {Wine} from "../../entities/Wine";
@Component({
    selector: "wine-results",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Region</th>
                    <th>In stock</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let wine of wines" [wineResult]="wine" 
                    (setStock)="onSetStock(wine, $event)" (setRate)="onSetRate(wine, $event)" (remove)="onRemove(wine)">
                </tr>
                <tr *ngIf="wines && wines.length === 0">
                    <td colspan="7">You haven't added any wines yet</td>
                </tr>
            </tbody>
        </table>
    `
})
export class WineResults {
    @Input() wines: Array<Wine>;
    @Output() remove = new EventEmitter<Wine>();
    @Output() setRate = new EventEmitter<{wine: Wine, value: Number}>();
    @Output() setStock = new EventEmitter<{wine: Wine, value: Number}>();

    public onSetRate(wine: Wine, value: number): void {
        this.setRate.emit({wine, value});
    }

    public onSetStock(wine: Wine, value: number): void {
        this.setStock.emit({wine, value});
    }

    public onRemove(wine: Wine): void {
        this.remove.emit(wine);
    }
}