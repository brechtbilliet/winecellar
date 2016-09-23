import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Action, ActionReducer} from "@ngrx/store";
export function handleUndo(rootReducer: ActionReducer<ApplicationState>, bufferSize = 100): ActionReducer<ApplicationState> {
    let executedActions: Array<Action> = [];
    let initialState = undefined;
    return (state: ApplicationState, action: Action) => {
        if (action.type === "UNDO_ACTION") {
            let newState: any = initialState;
            executedActions = executedActions.filter(eAct => eAct !== action.payload);
            executedActions.forEach(executedAction => newState = rootReducer(newState, executedAction));
            return newState;
        }
        executedActions.push(action);
        let updatedState =  rootReducer(state, action);
        if (executedActions.length === bufferSize + 1) {
            let firstAction = executedActions[0];
            // calculate the state x (buffersize) actions ago
            initialState = rootReducer(initialState, firstAction);
            // keep the correct actions
            executedActions = executedActions.slice(1, bufferSize + 1);
        }
        return updatedState;
    };
}