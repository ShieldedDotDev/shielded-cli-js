import { Response } from 'node-fetch';
export interface ShieldOptions {
    endpoint: string;
    token: string;
    title?: string;
    text?: string;
    color?: string;
}
export interface ShieldResponse {
    ShieldURL: string;
}
export declare class StatusError extends Error {
    status: number;
    result: Response;
    constructor(message: string, status: number, result: Response);
}
export declare class ShieldedAPI {
    private options;
    constructor(options?: Partial<ShieldOptions>);
    updateShield(options?: Partial<ShieldOptions>): Promise<ShieldResponse>;
}
