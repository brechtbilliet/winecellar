import {Headers} from "@angular/http";
export const API_URL: string = "https://winecellarapp.herokuapp.com/api";
export const DEFAULT_HEADERS: Headers = new Headers({ "Content-Type": "application/json" });
export const LOCALSTORAGE_AUTH: string = "authentication";
export const WINE_COM_API_URL: string = "http://services.wine.com/api/beta2/service.svc/json/";
export const WINE_COM_API_KEY: string = "%API_KEY%";