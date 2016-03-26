import {Headers} from "angular2/http";
export const WINE_COM_API_URL: string = "http://services.wine.com/api/beta2/service.svc/json/";
export const WINE_COM_API_KEY: string = "%API_KEY%";
export const API_URL: string = "%BACKEND_ENV%";
export const DEFAULT_HEADERS: Headers = new Headers({ "Content-Type": "application/json" });
export const LOCALSTORAGE_AUTH: string = "authentication";