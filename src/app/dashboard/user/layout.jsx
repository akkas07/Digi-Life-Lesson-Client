import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const DashboardLayout = async ({ children }) => {

    const userSession = await auth.api.getSession({
        headers: await headers(),
    });

    const user = userSession?.user;

    if (!user || user?.role !== 'user') {
        return (
            <div className="flex justify-center items-center h-screen">You must be signed in to view this page.</div>
        );
    }
    

    return (
        <div className="flex h-screen">
            <div className="flex-1 overflow-auto">{children}</div>
        </div>
    );
};

export default DashboardLayout;