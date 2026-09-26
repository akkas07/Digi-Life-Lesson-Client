import { getLessonById } from '@/lib/api/lessons';
import React from 'react';
import LessonDetailsClient from './LessonDetailsClient';

const DetailsLessonPage = async ({ params }) => {
    const { lessonId } = await params;
    
    // Fetch the lesson data on the server
    const lesson = await getLessonById(lessonId);
    
    

    if (!lesson) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-gray-600">Lesson not found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <LessonDetailsClient lesson={lesson} />
        </div>
    );
};

export default DetailsLessonPage;