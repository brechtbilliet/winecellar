import {Store} from "@ngrx/store";
import {WineEndpoint} from "../../endpoints/WineEndpoint";
import {Wine} from "../../entities/Wine";
import {DetailWine} from "../../components/detail-wine/detail-wine.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CONTAINER_EDITWINEPAGE_CLEAR_WINE} from "../../../common/actionTypes";
import {ROUTER_DIRECTIVES, RouteParams, Router} from "angular2/router";
import {ChangeDetectionStrategy, Component, OnDestroy} from "angular2/core";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../../../common/state/ApplicationState";
@Component({
    selector: "add-wine-page",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WineEndpoint],
    directives: [ROUTER_DIRECTIVES, DetailWine, DefaultPage, Main],
    template: `
    <default-page>
        <main>
            <div class="row">
                <div class="col-sm-12">
                    <h1><i class="fa fa-pencil"></i>&nbsp;Edit wine</h1>
                </div>
             </div>
             <div class="row">
                <detail-wine [wine]="wine$|async" *ngIf="wine$|async" (onSave)="onSave($event)"></detail-wine>
            </div>
        </main>
    </default-page>
   
     `
})
export class EditWinePage implements OnDestroy {
    public wine$: Observable<Wine>;

    private subscription: Subscription;

    constructor(
                private routeParams: RouteParams,
                private store: Store<ApplicationState>,
                private wineEndpoint: WineEndpoint,
                private router: Router) {
        this.wineEndpoint.loadById(routeParams.get("id"));
        this.wine$ = this.store.select((state: ApplicationState) => {
            return state.containers.editWinePage.wine;
        });
    }

    public onSave(wine: Wine): void {
        this.subscription = this.wineEndpoint.update(this.routeParams.get("id"), wine).subscribe(() => {
            this.router.navigateByUrl("/stock");
        });
    }

    public ngOnDestroy(): void {
        this.store.dispatch({type: CONTAINER_EDITWINEPAGE_CLEAR_WINE});
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}