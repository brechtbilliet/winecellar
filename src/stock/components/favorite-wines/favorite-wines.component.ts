import {Component, EventEmitter, Output, Input, ChangeDetectionStrategy} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import * as _ from "lodash";
import {Wine} from "../../entities/Wine";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";
@Component({
    selector: "favorite-wines",
    directives: [NumberPicker, ROUTER_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [require("./favorite-wines.component.scss")],
    template: `
       <div>
            <h2><i class="fa fa-star"></i>&nbsp;Favorites</h2>
            <table class="table table-striped">
                <tbody>
                    <tr *ngFor="#wine of favoriteWines">
                        <td style="min-width:70px;">
                            <number-picker [amount]="wine.inStock" (setAmount)="setStock(wine, $event)"></number-picker>
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
    @Output() public onSetStock: EventEmitter<any>;

    @Input() public wines: Array<Wine>;

    constructor() {
        this.onSetStock = new EventEmitter();
    }

    public get favoriteWines(): Array<Wine> {
        return <Array<Wine>>_.orderBy(this.wines, ["myRating"], ["desc"]);
    }

    public setStock(wine: Wine, value: number): void {
        this.onSetStock.emit({wine, value});
    }
}