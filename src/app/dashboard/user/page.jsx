
import UserDashboard from '@/components/dashboard/UserDashboard';
import { getSession } from '@/lib/actions/core/getSession';
import { getLessonByUserId } from '@/lib/api/lessons';
import { getLikeCount } from '@/lib/api/like';
import React from 'react';

const UserHomePage = async () => {

    const user = await getSession();
    const userId = user?.id;
  
  const lessons = await getLessonByUserId(userId);

  const likeCount = await getLikeCount(userId);


    return (
        <div>
            
        <UserDashboard lessons={lessons} likeCount={likeCount} />
        </div>
    );
};

export default UserHomePage;