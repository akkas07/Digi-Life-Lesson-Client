/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { 
  MdOutlineManageAccounts, 
  MdOutlineDeleteOutline, 
  MdOutlineShield,
  MdMailOutline
} from 'react-icons/md';
import Swal from 'sweetalert2';

// --- মক ডাটা (Mock Data) ---
const initialUsers = [
  { id: "1", name: "Ahashan Habib Utsho", email: "habibutsho.ph@gmail.com", role: "admin", totalLessons: 25, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
  { id: "2", name: "Programming-Hero Instructors", email: "instructors@programming-hero.com", role: "user", totalLessons: 14, avatar: "" },
  { id: "3", name: "md rayhan", email: "md.rayhanx617@gmail.com", role: "user", totalLessons: 8, avatar: "" },
  { id: "4", name: "Admin", email: "admin@gmail.com", role: "admin", totalLessons: 42, avatar: "" }
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);

  // --- রোল পরিবর্তন করার ফাংশন ---
  const handleRoleChange = (userId, newRole) => {
    Swal.fire({
      title: "Update User Role?",
      text: `Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a855f7", // Purple Accent
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prevUsers => 
          prevUsers.map(user => user.id === userId ? { ...user, role: newRole } : user)
        );
        
        Swal.fire({
          title: "Role Updated!",
          text: `User role has been successfully changed to ${newRole}.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // --- অ্যাকাউন্ট ডিলিট করার ফাংশন ---
  const handleDeleteUser = (userId, userName) => {
    Swal.fire({
      title: "Delete Account?",
      text: `This will permanently remove ${userName}'s profile. This action cannot be undone!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e", // Rose Accent
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, delete user!"
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        
        Swal.fire({
          title: "Deleted!",
          text: "The user account has been successfully removed.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-[#040712] text-zinc-100 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-purple-950/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-fuchsia-950/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-10 border-b border-zinc-900 pb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-950/40 border border-purple-900/30 rounded-xl text-purple-400">
            <MdOutlineManageAccounts className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
              User Governance
            </h1>
            <p className="text-xs text-zinc-400 font-medium mt-1">
              Currently managing <span className="text-purple-400 font-bold font-mono">{users.length}</span> active platform contributors.
            </p>
          </div>
        </div>
      </div>

      {/* --- Core Governance Table --- */}
      <div className="w-full overflow-x-auto rounded-[24px] border border-zinc-900 bg-[#090b14]/40 backdrop-blur-md relative z-10 shadow-2xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-zinc-500 uppercase text-[10px] tracking-widest border-b border-zinc-900 bg-[#0d101d]/60">
              <th className="p-5 font-bold">User Information</th>
              <th className="p-5 font-bold">Contact Email</th>
              <th className="p-5 font-bold">Lessons Created</th>
              <th className="p-5 font-bold">Role Matrix</th>
              <th className="p-5 font-bold text-right pr-8">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/50">
            {users.map((user) => (
              <tr 
                key={user.id}
                className="hover:bg-[#121626]/30 transition-colors group"
              >
                {/* COLUMN 1: USER AVATAR & NAME */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 overflow-hidden shrink-0 flex items-center justify-center text-zinc-400 shadow-inner">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="text-sm font-bold uppercase font-mono">
                          {user.name.substring(0, 2)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-zinc-200 group-hover:text-purple-400 transition-colors">
                        {user.name}
                      </p>
                      <span className="text-[9px] font-mono tracking-widest uppercase font-bold text-zinc-500 block mt-0.5">
                        ID: {user.id}
                      </span>
                    </div>
                  </div>
                </td>

                {/* COLUMN 2: EMAIL ADDRESS */}
                <td className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MdMailOutline className="w-3.5 h-3.5 text-zinc-600" />
                    <span>{user.email}</span>
                  </div>
                </td>

                {/* COLUMN 3: TOTAL LESSONS BADGE */}
                <td className="p-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-300 bg-purple-950/30 px-2.5 py-1 rounded-lg border border-purple-900/20">
                    {user.totalLessons} Indexings
                  </span>
                </td>

                {/* COLUMN 4: DYNAMIC ROLE DROPDOWN */}
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <MdOutlineShield className={`w-3.5 h-3.5 ${user.role === 'admin' ? 'text-purple-400' : 'text-zinc-500'}`} />
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="bg-[#0d101d] border border-zinc-850 text-xs text-zinc-300 font-medium rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500/50 cursor-pointer transition-colors"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </td>

                {/* COLUMN 5: ACCOUNT DELETION */}
                <td className="p-5 text-right pr-8">
                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    className="p-2 bg-zinc-900/40 border border-zinc-850/60 text-zinc-500 hover:text-rose-400 hover:border-rose-950/40 rounded-xl transition-all shadow-sm"
                    title="Delete User Account"
                  >
                    <MdOutlineDeleteOutline className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="p-16 text-center text-zinc-500 font-mono text-xs tracking-widest">
            NO USERS ARCHIVED WITHIN SYSTEM.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsersPage;