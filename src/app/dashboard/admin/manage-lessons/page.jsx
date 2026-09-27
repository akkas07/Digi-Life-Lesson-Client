import React from 'react';
import ManageLessonPage from './ManageLessonsPage';
import { showLessons } from '@/lib/api/lessons';
import { fetchReports, getUserReports } from '@/lib/api/admin';

const ManageLesson = async () => {

  const lessonData = await showLessons(); 
  const allReports = await fetchReports()
     const report = allReports?.data || 0;

  return <ManageLessonPage lessonData={lessonData} report={report} />;
};

export default ManageLesson;