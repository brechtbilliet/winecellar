import {Input, ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Wine} from "../../entities/Wine";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";
import {Rating} from "../../../common/components/rating/rating.component";
@Component({
    selector: '[wineResult]',
    directives: [Rating, NumberPicker, ROUTER_DIRECTIVES],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <td><img src="{{wine.image}}"></td>
        <td>{{wine.name}}</td>
        <td>{{wine.region}}</td>
        <td style="min-width:80px;">
            <number-picker [amount]="wine.inStock" (setAmount)="onSetStock($event)"></number-picker>
        </td>
        <td>{{wine.price}}</td>
        <td><rating [big]="true" [rating]="wine.myRating" (setRate)="onSetRate($event)"></rating></td>
        <td>
            <div class="pull-right">
                <div class="btn-group">
                    <a class="btn btn-lg btn-primary" [routerLink]="['/EditWine', {id: wine._id}]">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <button class="btn btn-lg btn-danger" (click)="onRemove(wine)"><i class="fa fa-trash-o"></i></button>
                </div>
            </div>
        </td>
    `
})
export class WineResult {
    @Input('wineResult') public wine:Wine;

    @Output() public remove = new EventEmitter();
    @Output() public setRate = new EventEmitter<number>();
    @Output() public setStock = new EventEmitter<number>();

    public onSetRate(value:number):void {
        this.setRate.emit(value);
    }

    public onSetStock(value:number):void {
        this.setStock.emit(value);
    }

    public onRemove():void {
        this.remove.emit(null);
    }
}
