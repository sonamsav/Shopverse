import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminUsers = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const getAllUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:8000/api/v1/user/all-users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/user/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));

        toast.success(res.data.message || "User deleted successfully");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastUser = currentPage * usersPerPage;

  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  return (
    <div className="bg-white rounded-xl border p-5">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">User Management</h1>

          <p className="text-sm text-slate-500">Manage all registered users</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full md:w-72 border rounded-lg pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="hidden md:block px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
            {filteredUsers.length} Users
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <p className="text-slate-500">Loading users...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block border rounded-xl overflow-hidden bg-white">
            <div className="h-[500px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b sticky top-0 z-10">
                  {" "}
                  <tr>
                    <th className="text-left p-4">User</th>

                    <th className="text-left p-4">Email</th>

                    <th className="text-left p-4">Role</th>

                    <th className="text-left p-4">Status</th>

                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-slate-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {user.profilePic ? (
                              <img
                                src={user.profilePic}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">
                                {user.firstName?.[0]}
                              </div>
                            )}

                            <div>
                              <p className="font-medium">
                                {user.firstName} {user.lastName}
                              </p>

                              <p className="text-xs text-slate-500">
                                ID: {user._id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">{user.email}</td>

                        <td className="p-4 capitalize">{user.role}</td>

                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              user.isVerified
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isVerified ? "Verified" : "Unverified"}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                navigate(`/dashboard/users/${user._id}`, {
                                  state: { user },
                                })
                              }
                              className="h-8 w-8 rounded-md hover:bg-blue-50 text-blue-600 flex items-center justify-center transition cursor-pointer"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              onClick={() => setDeleteUserId(user._id)}
                              className="h-8 w-8 rounded-md hover:bg-red-50 text-red-600 flex items-center justify-center transition cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-slate-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="grid md:hidden gap-3">
            {currentUsers.map((user) => (
              <div key={user._id} className="border rounded-xl p-4 bg-white">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">
                        {user.firstName?.[0]}
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium">
                        {user.firstName} {user.lastName}
                      </h3>

                      <p className="text-sm text-slate-500 break-all">
                        {user.email}
                      </p>

                      <p className="text-xs text-slate-400 mt-1 capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/users/${user._id}`)}
                      className="h-8 w-8 rounded-md hover:bg-blue-50 text-blue-600 flex items-center justify-center cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => setDeleteUserId(user._id)}
                      className="h-8 w-8 rounded-md hover:bg-red-50 text-red-600 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 border-t pt-4">
        <p className="text-sm text-slate-500">
          Page {filteredUsers.length === 0 ? 0 : indexOfFirstUser + 1}
          {" - "}
          {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </p>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="
        px-3
        py-2
        text-sm
        border
        rounded-lg
        disabled:opacity-40
        disabled:cursor-not-allowed cursor:pointer
      "
          >
            Prev
          </button>

          <div className="px-4 py-2 text-sm border rounded-lg bg-slate-50">
            Page {currentPage} of {Math.max(totalPages, 1)}
          </div>

          <button
            disabled={currentPage >= totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="
        px-3
        py-2
        text-sm
        border
        rounded-lg
        disabled:opacity-40
        disabled:cursor-not-allowed
        cursor-pointer
      "
          >
            Next
          </button>
        </div>
      </div>
      {/* Delete Dialog */}
      {deleteUserId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setDeleteUserId(null)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold">Delete User</h3>

            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDeleteUser(deleteUserId);
                  setDeleteUserId(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
