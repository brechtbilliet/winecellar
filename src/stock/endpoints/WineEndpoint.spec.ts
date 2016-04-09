import {it, describe} from "angular2/testing";
import {WineEndpoint} from "./WineEndpoint";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Http, Response, RequestOptionsArgs, Headers, ResponseOptions} from "angular2/http";
import {Store} from "@ngrx/store";
import {Wine} from "../entities/Wine";
import {INITIAL_STATE} from "../../common/state/initialState";
import {Observable} from "rxjs/Observable";
import * as toastr from "toastr";
import {Observer} from "rxjs/Observer";
import {
    CONTAINER_APPLICATION_ENABLE_BUSY_FLAG,
    CONTAINER_APPLICATION_DISABLE_BUSY_FLAG,
    DATA_WINES_ADD,
    DATA_WINES_UPDATE,
    DATA_WINES_REMOVE,
    DATA_WINES_ADD_ALL, CONTAINER_EDITWINEPAGE_SET_WINE, DATA_WINES_UPDATE_RATE, DATA_WINES_UPDATE_STOCK
} from "../../common/actionTypes";
import Spy = jasmine.Spy;
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
        (<Spy>httpMock.put).and.returnValue(result$);
        (<Spy>httpMock.delete).and.returnValue(result$);
        (<Spy>httpMock.get).and.returnValue(result$);
    });

    // add()
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
        it("should enable the busy state", () => {
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
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the new wine", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: DATA_WINES_ADD,
                    payload: JSON.parse(JSON.stringify(wineResult))
                });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    // update
    describe("on update()", () => {
        let wineToUpdate: Wine;
        let result: Observable<Wine>;
        let wineId: string = "fakeid";
        beforeEach(() => {
            wineToUpdate = new Wine();
            result = endpoint.update(wineId, wineToUpdate);
        });
        it("should do the appropriate http call", () => {
            expect(httpMock.put).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(wineToUpdate), expectedHttpOptions);
        });
        it("should enable the busy state", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        it("should return an observable", () => {
            expect(result.subscribe).toBeDefined();
        });
        describe("given the call was successful", () => {
            beforeEach(() => {
                resolveBackendCall(new Response(new ResponseOptions()));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the updated wine", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith(
                    {
                        type: DATA_WINES_UPDATE,
                        payload: {
                            wine: wineToUpdate,
                            _id: wineId
                        }
                    });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    // on remove()
    describe("on remove()", () => {
        let wineToRemove: Wine;
        let wineId: string = "fakeid";
        beforeEach(() => {
            wineToRemove = new Wine();
            wineToRemove._id = wineId;
            endpoint.remove(wineToRemove);
        });
        it("should do the appropriate http call", () => {
            expect(httpMock.delete).toHaveBeenCalledWith(jasmine.any(String), expectedHttpOptions);
        });
        it("should enable the busy state", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        describe("given the call was successful", () => {
            let wineResult: Wine;
            beforeEach(() => {
                wineResult = new Wine();
                resolveBackendCall(new Response(new ResponseOptions()));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the removed wine", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith(
                    {
                        type: DATA_WINES_REMOVE,
                        payload: wineId
                    });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    // on load()
    describe("on load()", () => {
        beforeEach(() => {
            endpoint.load();
        });
        it("should do the appropriate http call", () => {
            expect(httpMock.get).toHaveBeenCalledWith(jasmine.any(String), expectedHttpOptions);
        });
        it("should enable the busy state", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        describe("given the call was successful", () => {
            let winesResult: Array<Wine>;
            beforeEach(() => {
                winesResult = [new Wine(), new Wine()];
                resolveBackendCall(new Response(new ResponseOptions({body: JSON.stringify(winesResult)})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the fetched wines", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith(
                    {
                        type: DATA_WINES_ADD_ALL,
                        payload: JSON.parse(JSON.stringify(winesResult))
                    });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    // on loadById
    describe("on loadCurrentWine()", () => {
        let id: string = "fakeid"
        beforeEach(() => {
            endpoint.loadCurrentWine(id);
        });
        it("should do the appropriate http call", () => {
            expect(httpMock.get).toHaveBeenCalledWith(jasmine.any(String), expectedHttpOptions);
        });
        it("should enable the busy state", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        describe("given the call was successful", () => {
            let wineResult: Wine;
            beforeEach(() => {
                wineResult = new Wine();
                resolveBackendCall(new Response(new ResponseOptions({body: JSON.stringify(wineResult)})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the fetched wines", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith(
                    {
                        type: CONTAINER_EDITWINEPAGE_SET_WINE,
                        payload: JSON.parse(JSON.stringify(wineResult))
                    });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    // on setRate()
    describe("on setRate()", () => {
        let wineToUpdate: Wine;
        let wineId: string = "fakeid";
        let rating: number = 3;
        beforeEach(() => {
            wineToUpdate = new Wine();
            wineToUpdate._id = wineId;
            endpoint.setRate(wineToUpdate, rating);
        });
        it("should do the appropriate http call", () => {
            let expectedBody: Wine = Object.assign({}, wineToUpdate, {
                myRating: rating
            })
            expect(httpMock.put).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(expectedBody), expectedHttpOptions);
        });
        it("should enable the busy state", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        describe("given the call was successful", () => {
            beforeEach(() => {
                resolveBackendCall(new Response(new ResponseOptions()));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the updated wine", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith(
                    {
                        type: DATA_WINES_UPDATE_RATE,
                        payload: {
                            myRating: rating,
                            _id: wineId
                        }
                    });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });

    // on setStock()
    describe("on setStock()", () => {
        let wineToUpdate: Wine;
        let wineId: string = "fakeid";
        let inStock: number = 3;
        beforeEach(() => {
            wineToUpdate = new Wine();
            wineToUpdate._id = wineId;
            endpoint.setStock(wineToUpdate, inStock);
        });
        it("should do the appropriate http call", () => {
            let expectedBody: Wine = Object.assign({}, wineToUpdate, {
                inStock: inStock
            })
            expect(httpMock.put).toHaveBeenCalledWith(jasmine.any(String), JSON.stringify(expectedBody), expectedHttpOptions);
        });
        it("should enable the busy state", () => {
            expect(storeMock.dispatch).toHaveBeenCalledWith({type: CONTAINER_APPLICATION_ENABLE_BUSY_FLAG});
        });
        describe("given the call was successful", () => {
            beforeEach(() => {
                resolveBackendCall(new Response(new ResponseOptions()));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should should notify the store with the updated wine", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith(
                    {
                        type: DATA_WINES_UPDATE_STOCK,
                        payload: {
                            inStock: inStock,
                            _id: wineId
                        }
                    });
            });
        });
        describe("given ghe call failed", () => {
            let errorMessage: string = "something went wrong";
            beforeEach(() => {
                spyOn(toastr, "error");
                rejectBackendCall(new Response(new ResponseOptions({body: JSON.stringify({error: errorMessage})})));
            });
            it("should disable the busy state", () => {
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: CONTAINER_APPLICATION_DISABLE_BUSY_FLAG
                });
            });
            it("should show an appropriate toastr", () => {
                expect(toastr.error).toHaveBeenCalledWith(errorMessage);
            });
        });
    });
});