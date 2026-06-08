import React, { useState } from "react";
import { User, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import axios from "axios";

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const userId = params.userId;
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    city: user?.city || "",
    address: user?.address || "",
    zipCode: user?.zipCode || "",
    profilePic: user?.profilePic || "",
    role: user?.role || "",
    phoneNo: user?.phoneNo || "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      setFormData({
        ...formData,
        profilePic: URL.createObjectURL(selectedFile),
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      city: user?.city || "",
      address: user?.address || "",
      zipCode: user?.zipCode || "",
      profilePic: user?.profilePic || "",
      role: user?.role || "",
      phoneNo: user?.phoneNo || "",
    });

    setIsEditing(false);
  };

const handleSave = async (e) => {
  e.preventDefault();

  try {
    const accessToken = localStorage.getItem("accessToken");

    const uploadFormData = new FormData();

    uploadFormData.append("firstName", formData.firstName);
    uploadFormData.append("lastName", formData.lastName);
    uploadFormData.append("address", formData.address);
    uploadFormData.append("city", formData.city);
    uploadFormData.append("zipCode", formData.zipCode);
    uploadFormData.append("phoneNo", formData.phoneNo);
    uploadFormData.append("role", formData.role);

    if (file) {
      uploadFormData.append("file", file);
    }

    const res = await axios.put(
      `http://localhost:8000/api/v1/user/update/${userId}`,
      uploadFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    if (res.data.success) {
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
      setIsEditing(false);
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);

    toast.error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};
  const inputClass = `w-full rounded-lg px-4 py-3 transition-all duration-200 ${
    isEditing
      ? "bg-white border-2 border-pink-300 focus:border-pink-500 focus:outline-none"
      : "bg-gray-100 border border-gray-200 text-gray-600 cursor-default"
  }`;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {" "}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {" "}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}{" "}
          <div className="w-full md:w-64 border-r bg-gray-50">
            {" "}
            <div className="p-6 border-b">
              {" "}
              <div className="flex items-center gap-3">
                {" "}
                <div className="h-14 w-14 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xl font-bold">
                  {user?.firstName?.charAt(0)?.toUpperCase()}{" "}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hello,</p>
                  <p className="font-semibold text-gray-800">
                    {user?.firstName}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-6 py-4 flex items-center gap-3 transition ${
                activeTab === "profile"
                  ? "bg-pink-50 text-pink-600 border-r-4 border-pink-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <User size={18} />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-6 py-4 flex items-center gap-3 transition ${
                activeTab === "orders"
                  ? "bg-pink-50 text-pink-600 border-r-4 border-pink-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <Package size={18} />
              Orders
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 p-8">
            {activeTab === "profile" && (
              <>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-24 w-24 rounded-full overflow-hidden transition-all duration-300 ${
                        isEditing ? "ring-4 ring-pink-200" : ""
                      }`}
                    >
                      {formData.profilePic ? (
                        <img
                          src={formData.profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-pink-100 flex items-center justify-center text-pink-600 text-3xl font-bold">
                          {user?.firstName?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <label className="mt-3 cursor-pointer bg-pink-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-700">
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        className="px-5 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="mt-6 mb-2 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <p className="text-pink-700 font-medium">
                      ✏️ Editing Mode Enabled. Update your details and save
                      changes.
                    </p>
                  </div>
                )}

                {/* Form */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      First Name
                    </label>

                    <input
                      name="firstName"
                      value={formData.firstName}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      Last Name
                    </label>

                    <input
                      name="lastName"
                      value={formData.lastName}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/* <div className="md:col-span-2">
                    <label className="text-sm text-gray-500 block mb-2">
                      Email
                    </label>

                    <input
                      name="email"
                      value={formData.email}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div> */}
                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      Email
                    </label>

                    <input
                      name="email"
                      value={formData.email}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      Phone Number
                    </label>

                    <input
                      name="phoneNo"
                      value={formData.phoneNo}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  {/*  */}

                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      City
                    </label>

                    <input
                      name="city"
                      value={formData.city}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      ZipCode
                    </label>

                    <input
                      name="zipCode"
                      value={formData.zipCode}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm text-gray-500 block mb-2">
                      Address
                    </label>

                    <textarea
                      rows="4"
                      name="address"
                      value={formData.address}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === "orders" && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  My Orders
                </h2>

                <div className="flex flex-col items-center justify-center py-20">
                  <Package size={60} className="text-gray-300" />

                  <h3 className="mt-4 text-xl font-semibold text-gray-700">
                    No Orders Yet
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Looks like you haven't placed any orders yet.
                  </p>

                  <button className="mt-6 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
