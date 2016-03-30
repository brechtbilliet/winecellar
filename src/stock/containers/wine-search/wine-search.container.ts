import {Store} from "@ngrx/store";
import "./wine-search.container.scss";
import {Control} from "angular2/common";
import {Product, WineComSearchResult} from "../../WineComApiTypes";
import {WineComApiEndpoint} from "../../endpoints/WineComApiEndpoint";
import {Observable} from "rxjs/Observable";
import {
    CONTAINER_WINESEARCH_UPDATE_FOUND_WINES,
    CONTAINER_WINESEARCH_CLEAR_FOUND_WINES, CONTAINER_APPLICATION_ENABLE_BUSY_FLAG, CONTAINER_APPLICATION_DISABLE_BUSY_FLAG,
} from "../../../common/actionTypes";
import {Component, Input, EventEmitter, ElementRef, Output, ChangeDetectionStrategy} from "angular2/core";
import {ApplicationState} from "../../../common/state/ApplicationState";

@Component({
    selector: "wine-search",
    styles: [require("./wine-search.container.scss")],
    providers: [WineComApiEndpoint],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
            <label for="loginInput" class="col-sm-4 control-label">
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
                    <li *ngFor="#item of foundWines$ | async" (click)="selectWine(item)">
                        <img src="{{item.labels[0].url}}" alt=""/> {{item.name}} 
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class WineSearch {
    @Input()
    public control: Control;

    @Output()
    public onSelect: EventEmitter<Product>;

    public foundWines$: Observable<Array<Product>>;

    private previousVal: string;
    
    constructor(private el: ElementRef,
                private store: Store<ApplicationState>,
                private wineComApiEndpoint: WineComApiEndpoint) {
        this.onSelect = new EventEmitter();
        this.foundWines$ = this.store.select((state: ApplicationState) => {
            return state.containers.wineSearch.foundWines;
        });
    }

    public selectWine(wine: Product): void {
        this.store.dispatch({type: CONTAINER_WINESEARCH_UPDATE_FOUND_WINES, payload: []});
        this.onSelect.emit(wine);
    }

    public ngOnInit(): void {
        let searchElement: HTMLElement = this.el.nativeElement.querySelector("input");
        Observable.fromEvent(searchElement, "keyup")
            .map((e: any) => e.target.value)
            .do((value: string) => {
                if (value.length <= 2) {
                    this.store.dispatch({type: CONTAINER_WINESEARCH_CLEAR_FOUND_WINES});
                }
            })
            .debounceTime(300)
            .filter((value: string) => {
                return value.length > 2 && this.previousVal !== value;
            })
            .map((value: string): any => {
                this.store.dispatch({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
                this.previousVal = value;
                return this.wineComApiEndpoint.search(value);
            })
            .switch()
            .subscribe((resp: WineComSearchResult) => {
                this.store.dispatch({type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG});
                this.store.dispatch({type: CONTAINER_WINESEARCH_UPDATE_FOUND_WINES, payload: resp.products.list});
            });
    }
}