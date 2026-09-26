import { showLessons } from '@/lib/api/lessons';
import AdminDashboardHome from './AdminDashboardHomePage';
import { getAllUsers, getUserReports } from '@/lib/api/admin';

const AdminDashboard = async () => {
    
    const allUsers = await getAllUsers();
    const lessonData = await showLessons(); 
    const userReports = await getUserReports();
    
    const lessons = lessonData?.allLessons || [];
    const last24HoursCount = lessonData?.last24HoursCount || 0;
    const userReportsCount = userReports?.data.length || 0;
    
    return (
        <AdminDashboardHome 
            users={allUsers} 
            lessons={lessons} 
            last24HoursCount={last24HoursCount}
            userReportsCount={userReportsCount}
        />
    );
};

export default AdminDashboard;