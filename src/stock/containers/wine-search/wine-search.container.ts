import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Product, WineComSearchResult} from "../../services/wineCom.service";
import {FormControl} from "@angular/forms";
import {StockSandbox} from "../../stock.sandbox";

@Component({
    selector: "wine-search",
    styles: [require("./wine-search.container.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
            <label for="searchInput" class="col-sm-4 control-label">
                Name (*)
            </label>
            <div class="col-sm-8">
                <input type="text" [formControl]="control" class="form-control input-lg" id="searchInput" 
                    autocomplete="off" placeholder="Name"/>
                <span *ngIf="control.valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                <ul class="wine-search-results">
                    <li *ngFor="let item of winesToShow$|async" (click)="selectWine(item)">
                        <img src="{{item.labels[0].url}}" alt=""/> {{item.name}} 
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class WineSearchContainer {
    @Input() control: FormControl;
    @Output() onSelect = new EventEmitter<Product>();

    winesToShow$: Observable<Array<Product>>;

    private foundWineName: string;
    private reset$ = new Subject<boolean>();

    constructor(private sb: StockSandbox) {
    }

    selectWine(wine: Product): void {
        this.foundWineName = wine.name;
        this.onSelect.emit(wine);
        this.reset$.next(true);
    }

    ngOnInit(): void {
        let wines$ = this.control.valueChanges
            .do(value => this.reset$.next(value.length < 3))
            .debounceTime(300)
            .filter(value => value.length > 2 && value !== this.foundWineName)
            .map(value => this.sb.search(value))
            .switch()
            .map((res: WineComSearchResult) => res.products.list).cache();

        this.winesToShow$ = Observable.combineLatest(wines$, this.reset$, (wines: Array<Product>, clear: boolean) => {
            return clear ? [] : wines;
        });
    }
}