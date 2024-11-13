// @types/next-connect.d.ts
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';

    interface NextConnectOptions<
        Req extends IncomingMessage = NextApiRequest,
        Res extends ServerResponse = NextApiResponse
    > {
        onError?: (err: any, req: Req, res: Res, next: (err?: any) => void) => void;
        onNoMatch?: (req: Req, res: Res) => void;
    }

    interface NextConnect<
        Req extends IncomingMessage = NextApiRequest,
        Res extends ServerResponse = NextApiResponse
    > {
        use: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        handle: (req: Req, res: Res) => Promise<void>;
        get: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        post: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        put: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        delete: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        patch: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        options: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
        trace: (
            ...handlers: Array<
                (req: Req, res: Res, next: (err?: any) => void) => void
            >
        ) => this;
    }

    export default function <Req extends IncomingMessage = NextApiRequest, Res extends ServerResponse = NextApiResponse>(
        options?: NextConnectOptions<Req, Res>
    ): NextConnect<Req, Res>;
}
