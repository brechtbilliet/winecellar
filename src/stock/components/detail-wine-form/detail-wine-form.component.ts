import {Component, ChangeDetectionStrategy, Input, Output, OnInit, EventEmitter} from "@angular/core";
import {FormGroupContent} from "../../../common/components/form/form-group-content/form-group-content.component";
import {FormGroupTextbox} from "../../../common/components/form/form-group-textbox/form-group-textbox.component";
import {FormGroupTextarea} from "../../../common/components/form/form-group-textarea/form-group-textarea.component";
import {FormGroupFooter} from "../../../common/components/form/form-group-footer/form-group-footer.component";
import {Rating} from "../../../common/components/rating/rating.component";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";
import {Wine} from "../../entities/Wine";
import {WineSearch} from "../../containers/wine-search/wine-search.container";
import {Product} from "../../services/wineCom.service";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder, Validators} from "@angular/forms";
@Component({
    selector: "detail-wine-form",
    providers: [FormBuilder],
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [REACTIVE_FORM_DIRECTIVES, FormGroupTextbox, FormGroupTextarea, FormGroupFooter, ROUTER_DIRECTIVES,
        Rating, NumberPicker, FormGroupContent, WineSearch],
    template: `
<form [formGroup]="wineForm" class="form-horizontal col-sm-12" (ngSubmit)="onSubmit()">
    <wine-search [control]="wineForm.controls.name" (onSelect)="selectWine($event)"></wine-search>
    <form-group-textarea [label]="'Description'" [control]="wineForm.controls.description"
                         [placeholder]="'Enter description'">
            
    </form-group-textarea>
    <form-group-textbox [label]="'Region'" [control]="wineForm.controls.region" [placeholder]="'Enter region'">

    </form-group-textbox>
    <form-group-textbox [label]="'Price'" [control]="wineForm.controls.price" [placeholder]="'Enter price'">

    </form-group-textbox>
    <form-group-content [label]="'Rating'">
        <rating [big]="true" [rating]="wine.myRating" (setRate)="setRate($event)"></rating>
    </form-group-content>
    <form-group-content [label]="'Number in stock'">
        <number-picker [amount]="wine.inStock" (setAmount)="setInStock($event)"></number-picker>
    </form-group-content>
    <div class="form-group has-feedback">
        <div class=" col-sm-offset-4 col-sm-8"><img src="{{wine.image}}" alt=""/></div>
    </div>
    <form-group-footer>
        <button type="submit" [disabled]="!wineForm.valid" class="btn btn-primary btn-lg">
            <i class="fa fa-save"></i>&nbsp;Save wine
        </button>
        <a [routerLink]="['/stock']" class="btn btn-warning btn-lg"><i class="fa fa-undo"></i>&nbsp;Cancel</a>
    </form-group-footer>
</form>
     `
})
export class DetailWineForm implements OnInit {
    @Input() wine = new Wine();
    @Output() onSave = new EventEmitter<Wine>();

    constructor(private formBuilder: FormBuilder) {

    }

    wineForm: FormGroup;

    ngOnInit(): void {
        this.wineForm = this.formBuilder.group({
            name: [this.wine.name, Validators.required],
            description: [this.wine.description],
            region: [this.wine.region],
            price: [this.wine.price]
        });
    }

    onSubmit(): void {
        this.onSave.emit(Object.assign(this.wine, this.wineForm.value));
    }

    setRate(rate: number): void {
        this.wine.myRating = rate;
    }

    setInStock(inStock: number): void {
        this.wine.inStock = inStock;
    }

    selectWine(wine: Product): void {
        // (<Control>this.wineForm.controls["name"]).updateValue(wine.name);
        // (<Control>this.wineForm.controls["description"]).updateValue(wine.description);
        // (<Control>this.wineForm.controls["price"]).updateValue(wine.priceRetail);
        // (<Control>this.wineForm.controls["region"]).updateValue(wine.appellation.region.name);
        // this.wine.image = wine.labels.length > 0 ? wine.labels[0].url : null;
    }
}