import { getAllUsers } from "@/lib/api/admin";
import { showLessons } from "@/lib/api/lessons";
import ManageUsersPage from "./ManageUsersPage";

const ManageUsersServerPage = async () => {
    // ১. ডাটা ফেচ করা হচ্ছে
    const userData = await getAllUsers();
    const lessonData = await showLessons(); 
    
    // ২. সেফটি চেক: যদি userData সরাসরি অ্যারে না হয়ে অবজেক্টের ভেতর থাকে (যেমন userData.data)
    // অথবা যদি কোনো কারণে ডাটা মিসিং থাকে তবে ক্র্যাশ না করে খালি অ্যারে [] সেট করবে
    const allUsers = Array.isArray(userData) 
        ? userData 
        : (userData?.data || userData?.users || []);
        
    const lessons = lessonData?.allLessons || [];

    // ৩. সেফটি চেক পাস করার পর ম্যাপ চালানো হচ্ছে
    const processedUsers = allUsers.map(user => {
        const userLessons = lessons.filter(lesson => lesson.userEmail === user.email);
        
        return {
            ...user,
            id: user._id, 
            totalLessons: userLessons.length
        };
    });

   
   
    return (
        <ManageUsersPage initialUsers={processedUsers} />
    );
};

export default ManageUsersServerPage;