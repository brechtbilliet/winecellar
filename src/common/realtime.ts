import {BACKEND} from "../configuration";
import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Store} from "@ngrx/store";
import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import {info} from "toastr";
@Injectable()
export class RealTime {
    private socket: SocketIOClient.Socket;

    constructor(private store: Store<ApplicationState>) {
    }

    connect(): void {
        this.store.select(state => state.data.authentication.jwtToken).take(1).subscribe((token: string) => {
            this.socket = io(BACKEND, {query: "jwttoken=" + token});
            this.socket.on("UPDATE_REDUX", action => {
                info("Realtime update coming in!");
                this.store.dispatch(action)
            });
        });
    }

    disconnect(): void {
        this.socket.close();
    }
}

