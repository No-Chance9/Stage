// Import required modules
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();
                const user = await User.findOne({ email: credentials?.email }).select("+password");

                if (!user) throw new Error("Wrong Email");

                const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

                if (!passwordMatch) throw new Error("Wrong Password");

                // Return the full user document, but exclude sensitive data if necessary
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profilePicture: user.profilePicture,
                    // Add other fields as needed, excluding sensitive fields like `password`
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            // Add custom properties from the user token to the session
            session.user = {
                ...session.user,
                id: token.id as string,
                name: token.name,
                email: token.email,
                role: token.role as string,
                profilePicture: token.profilePicture as number,
                // Add any other user data you want to include in the session
            };
            return session;
        },
        async jwt({ token, user }) {
            // When the user first signs in, `user` will be available and we can add additional fields
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.profilePicture = user.profilePicture;
                // Include any other fields you want to keep in the token
            }
            return token;
        },
    },
};
