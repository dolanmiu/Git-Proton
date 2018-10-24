interface PersistanceSshCredentialsData {
    privateKey: string;
    publicKey: string;
    default: boolean;
}

interface PersistanceHttpsCredentialsData {
    username: string;
    password: string;
}

interface PersistanceCredentials {
    ssh: PersistanceSshCredentialsData;
    https: PersistanceHttpsCredentialsData;
}

interface PersistanceState {
    credentials: PersistanceCredentials;
}
