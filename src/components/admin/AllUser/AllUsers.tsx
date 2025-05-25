"use client";

import React from "react";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  profileUrl: string | null;
  role: "USER" | "ADMIN";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AllUsersProps {
  users: User[];
}

const AllUsers: React.FC<AllUsersProps> = ({ users }) => {
  const handleViewUser = (userId: string) => {
    toast.warning("Not applicable");
    console.log("Viewing user:", userId);
    // You can add navigation logic here
  };

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-gray-800">
        All Users
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.username}
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewUser(user.id)}
                    className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 p-2 rounded-full transition-colors duration-200"
                    title="View User"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!users || users.length === 0) && (
          <div className="text-center py-8 text-gray-500">No users found</div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {user.email}
                </h3>
                <p className="text-gray-600 text-sm mt-1">@{user.username}</p>
              </div>
              <button
                onClick={() => handleViewUser(user.id)}
                className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 p-2 rounded-full transition-colors duration-200 ml-2"
                title="View User"
              >
                <Eye size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                  user.role === "ADMIN"
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ))}

        {(!users || users.length === 0) && (
          <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
            No users found
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Total Users: {users?.length || 0}
      </div>
    </div>
  );
};

export default AllUsers;
