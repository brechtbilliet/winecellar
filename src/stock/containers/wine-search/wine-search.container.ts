import {Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy} from "angular2/core";
import {WineComEndpoint, Product, WineComSearchResult} from "../../endpoints/wineCom.endpoint";
import {Control} from "angular2/common";
import {Subject} from "rxjs";
import {Subscription} from "rxjs/Subscription";
import {WineSearchSandbox} from "../../sandboxes/wine-search.sandbox";

@Component({
    selector: "wine-search",
    styles: [require("./wine-search.container.scss")],
    providers: [WineComEndpoint, WineSearchSandbox],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
            <label for="searchInput" class="col-sm-4 control-label">
                Name (*)
            </label>
            <div class="col-sm-8">
                <input type="text" 
                    [ngFormControl]="control" 
                    class="form-control input-lg" 
                    id="searchInput" 
                    autocomplete="off"
                    placeholder="Name"/>
                <span *ngIf="control.valid" 
                    class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                <ul class="wine-search-results">
                    <li *ngFor="#item of foundWines$|async" (click)="selectWine(item)">
                        <img src="{{item.labels[0].url}}" alt=""/> {{item.name}} 
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class WineSearch implements OnDestroy {
    @Input() public control: Control;

    @Output()public onSelect: EventEmitter<Product>;

    public foundWines$: Subject<Array<Product>> = new Subject();
    private subscriptions: Array<Subscription> = [];

    constructor(private sandbox: WineSearchSandbox) {
        this.onSelect = new EventEmitter();
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
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}