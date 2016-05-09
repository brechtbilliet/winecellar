import {Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy} from "@angular/core";
import {Control} from "@angular/common";
import {Subject} from "rxjs";
import {Subscription} from "rxjs/Subscription";
import {WineSearchSandbox} from "../../sandboxes/wine-search.sandbox";
import {WineComService, Product, WineComSearchResult} from "../../services/wineCom.service";

@Component({
    selector: "wine-search",
    styles: [require("./wine-search.container.scss")],
    providers: [WineComService, WineSearchSandbox],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
            <label for="searchInput" class="col-sm-4 control-label">
                Name (*)
            </label>
            <div class="col-sm-8">
                <input type="text" [ngFormControl]="control" class="form-control input-lg" id="searchInput" 
                    autocomplete="off" placeholder="Name"/>
                <span *ngIf="control.valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                <ul class="wine-search-results">
                    <li *ngFor="let item of foundWines$|async" (click)="selectWine(item)">
                        <img src="{{item.labels[0].url}}" alt=""/> {{item.name}} 
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class WineSearch implements OnDestroy {
    @Input() public control: Control;

    @Output()public onSelect = new EventEmitter<Product>();

    public foundWines$ = new Subject<Array<Product>>();
    private subscriptions: Array<Subscription> = [];

    constructor(private sandbox: WineSearchSandbox) {
    }

    public selectWine(wine: Product): void {
        this.onSelect.emit(wine);
        this.reset();
    }

    public reset(): void {
        this.foundWines$.next([]);
    }

    public ngOnInit(): void {
        let subscription: Subscription = this.control.valueChanges
            .do((value: string) => {
                if (value.length < 3) {
                    this.reset();
                }
            })
            .debounceTime(300)
            .filter((value: string) => value.length > 2)
            .map((value: string) => this.sandbox.search(value))
            .switch()
            .map((res: WineComSearchResult) => res.products.list)
            .subscribe(this.foundWines$);
        this.subscriptions.push(subscription);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}