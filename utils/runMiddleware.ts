import { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';

type MiddlewareFunction = (req: NextApiRequest | NextRequest, res: any, next: (err?: any) => void) => void;

/**
 * Exécute un middleware dans le contexte de Next.js (API Route ou App Router).
 * @param req - La requête NextApiRequest ou NextRequest
 * @param fn - Le middleware à exécuter
 */
export async function runMiddleware(req: NextApiRequest | NextRequest, fn: MiddlewareFunction) {
    return new Promise<void>((resolve, reject) => {
        fn(req, {}, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve();
        });
    });
}
