// to make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            userId?: Number;
            cleanBody?: any;
            role: string;
            rawBody?: Buffer;
        }
    }
}
