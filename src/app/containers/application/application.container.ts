import {Title} from "@angular/platform-browser";
import {Component, OnInit, OnDestroy} from "@angular/core";
import "bootstrap";
import {AppSandbox} from "../../app.sandbox";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
@Component({
    selector: "application",
    providers: [Title],
    template: `
        <navbar [account]="account$|async" (logout)="logout()" *ngIf="isAuthenticated$|async"></navbar>
        <router-outlet></router-outlet>
        <spinner [spin]="isBusy$|async"></spinner>
  `
})
export class ApplicationContainer implements OnInit, OnDestroy {
    account$ = this.sb.account$;
    isBusy$ = this.sb.isBusy$;
    isAuthenticated$ = this.sb.isAuthenticated$;

    private subscriptions: Array<Subscription> = [];

    constructor(private title: Title, private sb: AppSandbox, private router: Router) {
        this.title.setTitle("Winecellar application");
    }

    ngOnInit(): void {
        this.sb.checkInitialAuthentication();
        this.subscriptions.push(this.sb.isAuthenticated$.subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.sb.loadWines();
                this.sb.connectRealTime();
            }
        }));
    }

    logout(): void {
        this.sb.logout();
        this.router.navigate(["/authentication"]);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}