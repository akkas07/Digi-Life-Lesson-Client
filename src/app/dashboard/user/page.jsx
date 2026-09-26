'use client';

import UserDashboard from '@/components/dashboard/UserDashboard';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const UserHomePage = () => {

    


    return (
        <div>
            
        <UserDashboard />
        </div>
    );
};

export default UserHomePage;