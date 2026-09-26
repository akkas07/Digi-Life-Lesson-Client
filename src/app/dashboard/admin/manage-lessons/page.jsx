import React from 'react';
import ManageLessonPage from './ManageLessonsPage';
import { showLessons } from '@/lib/api/lessons';

const ManageLesson = async () => {

   const lessonData = await showLessons(); 

  return <ManageLessonPage lessonData={lessonData} />;
};

export default ManageLesson;