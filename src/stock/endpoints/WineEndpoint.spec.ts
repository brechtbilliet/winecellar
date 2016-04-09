import {it, describe} from "angular2/testing";
import {WineEndpoint} from "./WineEndpoint";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Http, Response, RequestOptionsArgs, Headers, ResponseOptions} from "angular2/http";
import {Store} from "@ngrx/store";
import {Wine} from "../entities/Wine";
import {INITIAL_STATE} from "../../common/state/initialState";
import {Observable} from "rxjs/Observable";
import Spy = jasmine.Spy;
import * as toastr from "toastr";
import {Observer} from "rxjs/Observer";
import {
    CONTAINER_APPLICATION_ENABLE_BUSY_FLAG,
    CONTAINER_APPLICATION_DISABLE_BUSY_FLAG, DATA_WINES_ADD
} from "../../common/actionTypes";
describe("endpoint: WineEndpoint", () => {
    let endpoint: WineEndpoint;
    let storeMock: Store<ApplicationState>;
    let httpMock: Http;
    let state: ApplicationState;
    let resolveBackendCall: Function;
    let rejectBackendCall: Function;
    let expectedHttpOptions: RequestOptionsArgs;
    beforeEach(() => {
        storeMock = jasmine.createSpyObj("store", ["dispatch", "getState"]);
        state = Object.assign({}, INITIAL_STATE);
        expectedHttpOptions = {
            headers: new Headers({
                "authorization": "Bearer " + state.data.authentication.jwtToken,
                "Content-Type": "application/json"
            })
        };
        state.data.authentication.jwtToken = "faketoken";
        (<Spy>storeMock.getState).and.returnValue(INITIAL_STATE);
        httpMock = jasmine.createSpyObj("http", ["post", "put", "delete", "get"]);
        endpoint = new WineEndpoint(storeMock, httpMock);
        let result$: Observable<Response> = Observable.create((observer: Observer<Response>) => {
            resolveBackendCall = function (response: Response): void {
                observer.next(response);
            };
            rejectBackendCall = function (response: Response): void {
                observer.error(response);
            };
        });
        (<Spy>httpMock.post).and.returnValue(result$);
    })
    describe("on add()", () => {
        let wineToAdd: Wine;
        let result: Observable<Wine>;
        beforeEach(() => {
            wineToAdd = new Wine();
            result = endpoint.add(wineToAdd);
        });
        it("should do the appropriate http call", () => {
            expect(httpMock.post).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(wineToAdd), expectedHttpOptions);
        });
        it("should dispatch an CONTAINER_APPLICATION_ENABLE_BUSY_FLAG action", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        it("should return an observable", () => {
            expect(result.subscribe).toBeDefined();
        });
        describe("given the call was successful", () => {
            let wineResult: Wine;
            beforeEach(() => {
                wineResult = new Wine();
                wineResult._id = "fakeid";
                resolveBackendCall(new Response(new ResponseOptions({body: JSON.stringify(wineResult)})));
            });
            it("should dispatch an CONTAINER_APPLICATION_DISABLE_BUSY_FLAG action", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should dispatch an DATA_WINES_ADD action with the correct payload", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: DATA_WINES_ADD,
                    payload: JSON.parse(JSON.stringify(wineResult))
                });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                endpoint.add(wineToAdd);
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should dispatch an CONTAINER_APPLICATION_DISABLE_BUSY_FLAG action", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    describe("on update()", () => {

    });
    describe("on remove()", () => {

    });
    describe("on load()", () => {

    });
    describe("on loadById()", () => {

    });
    describe("on setRate()", () => {

    });
    describe("on setStock()", () => {

    })
});