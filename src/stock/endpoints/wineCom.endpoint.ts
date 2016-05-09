import {WINE_COM_API_URL, WINE_COM_API_KEY} from "../../configuration";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "angular2/http";
import {Injectable} from "angular2/core";
import {BusyHandlerService} from "../../common/services/busyHandler.service.ts";
@Injectable()
export class WineComEndpoint {
    constructor(private http: Http, private busyHandler: BusyHandlerService) {
    }

    public search(query: string): Observable<WineComSearchResult> {
        return this.busyHandler.handle(this.http
            .get(WINE_COM_API_URL + "catalog?apikey=" + WINE_COM_API_KEY + "&search=" + query)
            .map((resp: Response) => JSON.parse(JSON.stringify(resp.json()), camelCaseReviver)));
    }
}

function camelCaseReviver(key: string, value: any): any {
    if (value && typeof value === "object") {
        for (var k in value) {
            if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                delete value[k];
            }
        }
    }
    return value;
}

export interface WineComSearchResult {
    products: Products;
}
export interface Products {
    list: Array<Product>;
    offset: number;
    total: number;
}
export interface Product {
    name: string;
    priceMax: number;
    priceMin: number;
    priceRetail: number;
    ratings: Ratings;
    labels: Array<Label>;
    appellation: Appellation;
    description: string;
    id: number;
    varietal: Varietal;
}
export interface Ratings {
    highestScore: number;
}
export interface Label {
    name: string;
    url: string;
}
export interface Appellation {
    region: Region;
}
export interface Region {
    name: string;
}
export interface Varietal {
    name: string;
}