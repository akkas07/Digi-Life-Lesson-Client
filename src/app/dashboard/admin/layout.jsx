import { requireRole } from "@/lib/actions/core/getSession";



const AdminLayout = async ({ children }) => {
  
  await requireRole('admin');
  return children;
};

export default AdminLayout;
