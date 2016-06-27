import {Component, Output, Input, ChangeDetectionStrategy} from "@angular/core";
import {Wine} from "../../entities/Wine";
import {EventEmitter} from "@angular/router-deprecated/src/facade/async";
import {WineResult} from "../wine-result/wine-result.component";
@Component({
    selector: "wine-results",
    directives: [WineResult],
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
    @Input() public wines: Array<Wine>;

    @Output() public remove = new EventEmitter<Wine>();
    @Output() public setRate = new EventEmitter<{wine: Wine, value: Number}>();
    @Output() public setStock = new EventEmitter<{wine: Wine, value: Number}>();

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