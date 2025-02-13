export interface ShragaUser {
    id: string;
    adfsId: string;
    genesisId: string;
    name: { firstName: string; lastName: string };
    displayName: string;
    provider: 'Genesis' | 'ADFS';
    entityType: string;
    unit: string;
    dischargeDay: string;
    rank: string;
    job: string;
    phoneNumbers: string[];
    email: string;
    address: string;
    photo?: string;
    RelayState?: string;
    exp: number;
    iat: number;
    jti: string;
}

declare module 'express' {
    export interface Request {
        user?: ShragaUser;
    }
}
