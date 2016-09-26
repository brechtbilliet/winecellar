import {ApplicationState} from "./state/ApplicationState";
import {Action} from "@ngrx/store/src/dispatcher";
import {rootReducer} from "./rootReducer";

let executedActions: Array<Action> = [];
let initialState = undefined;
let bufferSize = 100
export function handleUndoReducer(state: ApplicationState, action: Action): ApplicationState {
    if (action.type === "UNDO_ACTION") {
        let newState: any = initialState;
        executedActions = executedActions.filter(eAct => eAct !== action.payload);
        executedActions.forEach(executedAction => newState = rootReducer(newState, executedAction));
        return newState;
    }
    executedActions.push(action);
    let updatedState = rootReducer(state, action);
    if (executedActions.length === bufferSize + 1) {
        let firstAction = executedActions[0];
        // calculate the state x (buffersize) actions ago
        initialState = rootReducer(initialState, firstAction);
        // keep the correct actions
        executedActions = executedActions.slice(1, bufferSize + 1);
    }
    return updatedState;
};