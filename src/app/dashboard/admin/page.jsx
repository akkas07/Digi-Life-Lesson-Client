import { showLessons } from '@/lib/api/lessons';
import AdminDashboardHome from './AdminDashboardHomePage';
import { getAllUsers } from '@/lib/api/admin';

const AdminDashboard = async () => {
    // ডাটা ফেচ করা হচ্ছে
    const allUsers = await getAllUsers();
    const lessonData = await showLessons(); 

    // ব্যাকএন্ড অবজেক্ট থেকে অল লেসন এবং ২৪ ঘণ্টার লেংথ আলাদা করা হচ্ছে
    const lessons = lessonData?.allLessons || [];
    const last24HoursCount = lessonData?.last24HoursCount || 0;
    
    return (
        <AdminDashboardHome 
            users={allUsers} 
            lessons={lessons} 
            last24HoursCount={last24HoursCount} // এখানে ২৪ ঘণ্টার ডাটার লেংথ পাঠানো হলো
        />
    );
};

export default AdminDashboard;