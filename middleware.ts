import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;

    // Récupérer le token JWT de la requête
    const token = await getToken({ req: request, secret });
    console.log('token:', token);

    if (!token) {
        // Si pas de token, redirige vers la page de connexion
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Si le token est valide, redirige vers le tableau de bord
    return NextResponse.redirect(new URL('/authentified/dashboard', request.url));
}

export const config = {
    matcher: '/authentified/:path*', // Applique le middleware sur toutes les routes sous /authentified
};
