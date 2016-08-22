import {ApplicationState} from "./state/ApplicationState";
import {Store} from "@ngrx/store";
import {CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable, state} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {LOCALSTORAGE_AUTH} from "../configuration";
@Injectable()
export class AuthenticatedGuard implements CanActivate {

    constructor(private store: Store<ApplicationState>, private router: Router) {}

    canActivate() {
        if (localStorage.getItem(LOCALSTORAGE_AUTH)) {
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(["/authentication"]);
        return false;
    }
}