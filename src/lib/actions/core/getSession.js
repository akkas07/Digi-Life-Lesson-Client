import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return session?.user || null;
};

export const requireRole = async (role) => {
    const user = await getSession();

    if (!user || user.role !== role) {
        redirect("/unauthorized");
    }

    return user;
};