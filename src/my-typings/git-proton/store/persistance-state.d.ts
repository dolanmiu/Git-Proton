interface PersistanceSshCredentialsData {
    privateKey: string;
    publicKey: string;
    default: boolean;
}

interface PersistanceCredentials {
    ssh: PersistanceSshCredentialsData;
}

interface PersistanceState {
    credentials: PersistanceCredentials;
}
