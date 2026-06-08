import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Save,
  Camera,
  Loader2,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const UserInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id: userId } = useParams();

  const selectedUser = location.state?.user;

  const [updateUser, setUpdateUser] = useState(selectedUser || null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setUpdateUser(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUpdateUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setUpdateUser((prev) => ({
      ...prev,
      profilePic: URL.createObjectURL(selectedFile),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const formData = new FormData();

      formData.append("firstName", updateUser?.firstName || "");
      formData.append("lastName", updateUser?.lastName || "");
      formData.append("address", updateUser?.address || "");
      formData.append("city", updateUser?.city || "");
      formData.append("zipCode", updateUser?.zipCode || "");
      formData.append("phoneNo", updateUser?.phoneNo || "");
      formData.append("role", updateUser?.role || "");

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setUpdateUser(res.data.user);

        toast.success(
          res.data.message || "User updated successfully"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!updateUser) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate("/dashboard/users")}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            {updateUser?.profilePic ? (
              <img
                src={updateUser.profilePic}
                alt={updateUser.firstName}
                className="h-28 w-28 rounded-full object-cover border"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-4xl font-bold">
                {updateUser?.firstName?.[0]}
              </div>
            )}

            <label className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-pink-600 text-white flex items-center justify-center cursor-pointer hover:bg-pink-700">
              <Camera size={16} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-800">
              {updateUser?.firstName} {updateUser?.lastName}
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-slate-500">
              <Mail size={15} />
              <span>{updateUser?.email}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium capitalize">
                {updateUser?.role}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  updateUser?.isVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {updateUser?.isVerified
                  ? "Verified"
                  : "Unverified"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  updateUser?.isLoggedIn
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {updateUser?.isLoggedIn
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold mb-6">
          Edit User Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-slate-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={updateUser?.firstName || ""}
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={updateUser?.lastName || ""}
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-2">
              Email
            </label>
            <input
              disabled
              type="email"
              value={updateUser?.email || ""}
              className="w-full h-11 px-4 border rounded-lg bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNo"
              value={updateUser?.phoneNo || ""}
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={updateUser?.city || ""}
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={updateUser?.zipCode || ""}
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Role
            </label>
            <select
              name="role"
              value={updateUser?.role || ""}
              onChange={handleChange}
              className="w-full h-11 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-600 mb-2">
              Address
            </label>
            <textarea
              rows={4}
              name="address"
              value={updateUser?.address || ""}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/dashboard/users")}
            className="h-11 px-5 border rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="h-11 px-5 bg-pink-600 text-white rounded-lg flex items-center gap-2 hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Updating...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;