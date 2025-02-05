/* v8 ignore start */
export interface User {
    name: string;
    IDFid: number;
    isAdmin: boolean;
}

export interface UserDocument extends User {
    _id: string;
}
