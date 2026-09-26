import { requireRole } from '@/lib/actions/core/getSession';
import React from 'react';

const DashboardLayout = async ({ children }) => {
    await requireRole('user');
    return children;
};

export default DashboardLayout;