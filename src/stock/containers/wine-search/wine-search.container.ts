import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnInit} from "@angular/core";
import {Subject, Subscription} from "rxjs";
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
export class WineSearchContainer implements OnDestroy, OnInit {
    @Input() control: FormControl;
    @Output() select = new EventEmitter<Product>();

    winesToShow$ = Subject.create();

    private foundWineName: string;
    private subscriptions: Array<Subscription> = [];

    constructor(private sb: StockSandbox) {
    }

    selectWine(wine: Product): void {
        this.foundWineName = wine.name;
        this.select.emit(wine);
        this.winesToShow$.next([]); // clear
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit(): void {
        let subscription = this.control.valueChanges
            .do((value: string) => {
                if (value.length < 3) {
                    this.winesToShow$.next([]); // clear
                }
            })
            .debounceTime(300)
            .distinctUntilChanged()
            .filter(value => value.length > 2 && value !== this.foundWineName)
            .switchMap(value => this.sb.search(value))
            .map((res: WineComSearchResult) => res.products.list)
            .subscribe((wines: Array<Product>) => {
                this.winesToShow$.next(wines);
            });
        this.subscriptions.push(subscription);
    }
}