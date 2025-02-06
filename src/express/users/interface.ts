/* v8 ignore start */
export interface User {
    genesisId: number;
    isAdmin: boolean;
}

export interface UserDocument extends User {
    _id: string;
}
