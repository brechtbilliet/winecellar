import {Component, Input, Output, ChangeDetectionStrategy} from "@angular/core";
import {Wine} from "../../entities/Wine";
import {EventEmitter} from "@angular/router-deprecated/src/facade/async";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";

@Component({
    selector: "favorite-wines",
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [NumberPicker],
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
export class FavoriteWines {
    @Input() public wines: Array<Wine>;
    @Output() public setStock = new EventEmitter<{wine: Wine, value: number}>();

    public onSetStock(wine: Wine, value: number): void {
        this.setStock.emit({wine, value});
    }
}