import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {Response, Headers, RequestOptionsArgs, RequestOptions, Http} from "@angular/http";
import {Wine} from "../entities/Wine";
import {ApplicationState} from "../../statemanagement/state/ApplicationState";
import {API_URL} from "../../configuration";
import {Observable} from "rxjs/Observable";
@Injectable()
export class StockService {
    private jwtToken: string;

    constructor(private store: Store<ApplicationState>,
                private http: Http) {
        this.store.select((state: ApplicationState) => state.data.authentication.jwtToken)
            .subscribe((jwtToken: string) => this.jwtToken = jwtToken);
    }

    add(wine: Wine): Observable<Wine> {
        return this.http.post(`${API_URL}/wines`, wine, this.authorizedHttpOptions())
            .map((res: Response) => res.json());
    }

    update(id: string, wine: Wine): Observable<Response> {
        return this.http.put(`${API_URL}/wines/${id}`, wine, this.authorizedHttpOptions());
    }

    remove(wine: Wine): Observable<Response> {
        return this.http.delete(`${API_URL}/wines/${wine._id}`, this.authorizedHttpOptions());
    }

    load(): Observable<Array<Wine>> {
        return this.http.get(`${API_URL}/wines`, this.authorizedHttpOptions())
            .map((res: Response) => res.json());
    }

    fetchWine(id: string): Observable<Wine> {
        return this.http.get(`${API_URL}/wines/${id}`, this.authorizedHttpOptions())
            .map((res: Response) => res.json());
    }

    setRate(wine: Wine, myRating: number): Observable<Response> {
        let newWine: Wine = Object.assign({}, wine, {myRating: myRating});
        return this.http.put(`${API_URL}/wines/${wine._id}`, newWine, this.authorizedHttpOptions());
    }

    setStock(wine: Wine, inStock: number): Observable<Response> {
        let newWine: Wine = Object.assign({}, wine, {inStock: inStock});
        return this.http.put(`${API_URL}/wines/${wine._id}`, newWine, this.authorizedHttpOptions());
    }

    private authorizedHttpOptions(): RequestOptionsArgs {
        let headers = new Headers({
            authorization: `Bearer ${this.jwtToken}`
        });
        return new RequestOptions({headers: headers});
    }
}