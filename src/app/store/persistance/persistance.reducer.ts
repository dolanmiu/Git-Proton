import * as PersistanceActions from './persistance.actions';

export function persistanceReducer(state: PersistanceState, action: PersistanceActions.Actions): PersistanceState {
    console.log(state);
    switch (action.type) {
        case PersistanceActions.PersistanceActionType.SetSshCredentials:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    ssh: action.credentials,
                },
            };
        case PersistanceActions.PersistanceActionType.SetHttpsCredentials:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    https: action.credentials,
                },
            };
        case PersistanceActions.PersistanceActionType.Set:
            const payload = action.payload;

            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    ssh: {
                        ...payload.credentials.ssh,
                        privateKey: payload.credentials.ssh ? payload.credentials.ssh.privateKey : '',
                        publicKey: payload.credentials.ssh ? payload.credentials.ssh.publicKey : '',
                        default: payload.credentials.ssh ? payload.credentials.ssh.default : false,
                    },
                    https: {
                        ...payload.credentials.https,
                        username: payload.credentials.https ? payload.credentials.https.username : '',
                        password: payload.credentials.https ? payload.credentials.https.password : '',
                    },
                },
            };
        default:
            return state;
    }
}
