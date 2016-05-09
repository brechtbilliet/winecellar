import {Wine} from "../../entities/Wine";
import {Rating} from "../../../common/components/rating/rating.component";
import {Component, Input, EventEmitter, Output, ChangeDetectionStrategy} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";
@Component({
    selector: "wine-results",
    directives: [Rating, NumberPicker, ROUTER_DIRECTIVES],
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
                <tr *ngFor="#wine of wines">
                    <td><img src="{{wine.image}}"></td>
                    <td>{{wine.name}}</td>
                    <td>{{wine.region}}</td>
                    <td style="min-width:80px;">
                        <number-picker [amount]="wine.inStock" (setAmount)="setStock(wine, $event)"></number-picker>
                    </td>
                    <td>{{wine.price}}</td>
                    <td><rating [big]="true" [rating]="wine.myRating" (setRate)="setRate(wine, $event)"></rating></td>
                    <td>
                        <div class="pull-right">
                            <div class="btn-group">
                                <a class="btn btn-lg btn-primary" [routerLink]="['/EditWine', {id: wine._id}]">
                                    <i class="fa fa-pencil"></i>
                                </a>
                                <button class="btn btn-lg btn-danger" (click)="remove(wine)"><i class="fa fa-trash-o"></i></button>
                            </div>
                        </div>
                    </td>
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

    @Output() public onRemove: EventEmitter<Wine>;
    @Output() public onSetRate: EventEmitter<any>;
    @Output() public onSetStock: EventEmitter<any>;

    constructor() {
        this.onRemove = new EventEmitter();
        this.onSetRate = new EventEmitter();
        this.onSetStock = new EventEmitter();
    }

    public setRate(wine: Wine, value: number): void {
        this.onSetRate.emit({wine, value});
    }

    public setStock(wine: Wine, value: number): void {
        this.onSetStock.emit({wine, value});
    }

    public remove(wine: Wine): void {
        this.onRemove.emit(wine);
    }
}