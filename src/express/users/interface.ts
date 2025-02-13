/* v8 ignore start */
export interface User {
    genesisId: string;
    isAdmin: boolean;
}

export interface UserDocument extends User {
    _id: string;
}
