import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();

    const { id } = params; // ID de la collection notifications de l'user

    try {
        const UserNotifications = await Notification.findById(id);

        if (!UserNotifications) {
            return NextResponse.json({ error: "User notifications not found" }, { status: 404 });
        }

        return NextResponse.json(UserNotifications.notifications, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();

    const { id } = params; // ID de la collection notifications de l'utilisateur
    const { notifications: newNotifications } = await request.json();

    try {
        const UserNotifications = await Notification.findById(id);

        if (!UserNotifications) {
            return NextResponse.json({ error: "User notifications not found" }, { status: 404 });
        }

        // Fusionner les notifications existantes et nouvelles sans doublons
        const uniqueNotifications = [
            ...new Set([...UserNotifications.notifications, ...newNotifications]),
        ];

        UserNotifications.notifications = uniqueNotifications;

        await UserNotifications.save();

        return NextResponse.json(UserNotifications, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
