import {ApplicationState} from "../statemanagement/state/ApplicationState";
import {Action, ActionReducer} from "@ngrx/store";
export function handleUndo(rootReducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
    let executedActions: Array<Action> = [];
    return (state: ApplicationState, action: Action) => {
        if (action.type === "UNDO_ACTION") {
            let newState: any = {};
            executedActions = executedActions.filter(eAct => eAct !== action.payload);
            executedActions.forEach(executedAction => newState = rootReducer(newState, executedAction));
            return newState;
        }
        executedActions.push(action);
        return rootReducer(state, action);
    };
}