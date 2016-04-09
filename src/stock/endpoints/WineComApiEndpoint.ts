import {Observable} from "rxjs/Observable";
import {Http, Response} from "angular2/http";
import {Injectable} from "angular2/core";
import {WINE_COM_API_KEY, WINE_COM_API_URL} from "../../configuration";
import {camelCaseReviver} from "../../common/util/camelcaseReviver";
import {WineComSearchResult} from "../WineComApiTypes";

@Injectable()
export class WineComApiEndpoint {
    constructor(private http: Http) {
    }

    public search(query: string): Observable<WineComSearchResult> {
        return this.http
            .get(WINE_COM_API_URL + "catalog?apikey=" + WINE_COM_API_KEY + "&search=" + query)
            .map((resp: Response) => {
                return JSON.parse(JSON.stringify(resp.json()), camelCaseReviver);
            });
    }
}