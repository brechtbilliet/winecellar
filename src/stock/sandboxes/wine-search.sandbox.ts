import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {WineComSearchResult, WineComService} from "../services/wineCom.service";

@Injectable()
export class WineSearchSandbox {
    constructor(private wineComService: WineComService) {
    }

    public search(term: string): Observable<WineComSearchResult> {
        return this.wineComService.search(term);
    }
}