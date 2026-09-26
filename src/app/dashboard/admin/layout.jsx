


const AdminLayout = async ({ children }) => {
  return (
    <div className="flex h-screen">
         
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
