import * as PersistanceActions from './persistance.actions';

const initialState: PersistanceState = {
    credentials: {
        ssh: {
            privateKey: '',
            publicKey: '',
            default: false,
        },
    },
};

export function persistanceReducer(state: PersistanceState = initialState, action: PersistanceActions.Actions): PersistanceState {
    switch (action.type) {
        case PersistanceActions.PersistanceActionType.SetSshCredentials:
            return {
                ...state,
                credentials: {
                    ssh: action.credentials,
                },
            };
        case PersistanceActions.PersistanceActionType.Set:
            return action.payload;
        default:
            return state;
    }
}
