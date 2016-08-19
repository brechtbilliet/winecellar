import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from "@angular/core";
import {Wine} from "../../entities/Wine";

@Component({
    selector: "favorite-wines",
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require("./favorite-wines.component.scss")],
    template: `    
    <div>
        <h2><i class="fa fa-star"></i>&nbsp;Favorites</h2>
        <table class="table table-striped">
            <tbody>
            <tr *ngFor="let wine of wines">
                <td style="min-width:70px;">
                    <number-picker [amount]="wine.inStock" (setAmount)="onSetStock(wine, $event)"></number-picker>
                </td>
                <td style="max-width: 200px;">{{wine.name}}</td>
                <td>{{wine.myRating}}/5</td>
            </tr>
            </tbody>
        </table>
    </div>
        `
})
export class FavoriteWinesComponent {
    @Input() wines: Array<Wine>;
    @Output() setStock = new EventEmitter<{wine: Wine, value: number}>();

    onSetStock(wine: Wine, value: number): void {
        this.setStock.emit({wine, value});
    }
}