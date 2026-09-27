import React from 'react';
import ReportedLessons from './ReportedLessons';
import { fetchReports } from '@/lib/api/admin';

const reportPage = async () => {
    const allReports = await fetchReports()
   const report = allReports?.data || 0;
    return <ReportedLessons report={report} />;
};

export default reportPage;