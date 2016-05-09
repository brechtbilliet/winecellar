import {Injectable} from "angular2/core";
import {WineComEndpoint, WineComSearchResult} from "../endpoints/wineCom.endpoint";
import {Observable} from "rxjs/Observable";

@Injectable()
export class WineSearchSandbox {
    constructor(private wineComEndpoint: WineComEndpoint) {
    }

    public search(term: string): Observable<WineComSearchResult> {
        return this.wineComEndpoint.search(term);
    }
}