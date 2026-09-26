import { getAllUsers } from "@/lib/api/admin";
import { showLessons } from "@/lib/api/lessons";
import ManageUsersPage from "./ManageUsersPage";

const ManageUsersServerPage = async () => {
    
    const userData = await getAllUsers();
    const lessonData = await showLessons(); 
    
    
    const allUsers = Array.isArray(userData) 
        ? userData 
        : (userData?.data || userData?.users || []);
        
    const lessons = lessonData?.allLessons || [];

    
    const processedUsers = allUsers.map(user => {
        const userLessons = lessons.filter((lesson) => {
            const lessonOwnerId = lesson?.userId || lesson?.user?.id;
            return (
                lessonOwnerId === user?._id ||
                lessonOwnerId === user?.id ||
                lesson?.userEmail === user?.email
            );
        });
        
        return {
            ...user,
            id: user?._id || user?.id,
            totalLessons: userLessons.length
        };
    });

   
   
    return (
        <ManageUsersPage initialUsers={processedUsers} />
    );
};

export default ManageUsersServerPage;