import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;

    // Récupérer le token JWT de la requête
    const token = await getToken({ req: request, secret, secureCookie: false });
    console.log('token:', token);

    if (!token) {
        console.log('Token middle:', token);

        // Si pas de token, redirige vers la page de connexion
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Sinon, laisse accéder à la page
    return NextResponse.next();

}

export const config = {
    matcher: '/authentified/:path*', // Applique le middleware sur toutes les routes sous /authentified
};
