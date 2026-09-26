import { showLessons } from '@/lib/api/lessons';
import AdminDashboardHome from './AdminDashboardHomePage';
import { getAllUsers, getUserReports } from '@/lib/api/admin';
import { getTopContributors } from '@/lib/api/featured';

const AdminDashboard = async () => {
    
    const allUsers = await getAllUsers();
    const userReports = await getUserReports();

    let lessons = [];
    let last24HoursCount = 0;
    let contributors = [];

    try {
      const lessonData = await showLessons();
      lessons = lessonData?.allLessons || [];
      last24HoursCount = lessonData?.last24HoursCount || 0;
    } catch (error) {
      console.warn("Failed to load lessons:", error);
    }

    try {
      const contributorsData = await getTopContributors();
      contributors = contributorsData?.data ?? contributorsData ?? [];
    } catch (error) {
      console.warn("Failed to load contributors:", error);
      contributors = [];
    }
    
    const userReportsCount = userReports?.data.length || 0;
    
    return (
        <AdminDashboardHome 
            users={allUsers} 
            lessons={lessons} 
            last24HoursCount={last24HoursCount}
            userReportsCount={userReportsCount}
            contributors={contributors}
        />
    );
};

export default AdminDashboard;