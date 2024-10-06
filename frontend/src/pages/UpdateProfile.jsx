import React, { useState, useEffect } from "react";
import axios from "axios";
import { decodeJwt } from "jose";
import { useToast } from "../Contexts/ToastContext.jsx";
import { useUser } from "../Contexts/UserContext.jsx";
import {
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../Validation.js";
import { ThreeDots } from "react-loader-spinner";

const UpdateProfile = () => {
  const { userInfo, setUserInfo } = useUser();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    profile: {},
    password: {},
  });
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decodedToken = decodeJwt(token);
      return decodedToken.sub;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/userInfo`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleProfileChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const firstNameError = validateName(userData.firstName);
    const lastNameError = validateName(userData.lastName);

    if (firstNameError || lastNameError) {
      setErrors((prev) => ({
        ...prev,
        profile: {
          firstName: firstNameError,
          lastName: lastNameError,
        },
      }));
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/update`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showToast(res.data.msg, "success");

      setUserInfo({ ...userInfo, ...userData });

      setErrors({
        profile: {},
        password: {},
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        profile: {
          general:
            error.response?.data?.msg || "Error updating profile information",
        },
      }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(passwordData.newPassword);
    const confirmPasswordError = validateConfirmPassword(
      passwordData.newPassword,
      passwordData.confirmPassword
    );

    if (passwordError || confirmPasswordError) {
      setErrors((prev) => ({
        ...prev,
        password: {
          password: passwordError,
          confirmPassword: confirmPasswordError,
        },
      }));
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/user/updatePassword`,
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showToast(res.data.msg, "success");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({
        profile: {},
        password: {},
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        password: {
          general: error.response?.data?.msg || "Error updating password",
        },
      }));
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                visible={true}
              />
            </div>
          ) : (
            <>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex-1 py-2 rounded ${
                    activeTab === "profile" ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  Update Profile
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`flex-1 py-2 rounded ${
                    activeTab === "password" ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  Update Password
                </button>
              </div>

              {activeTab === "profile" && (
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-300">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded bg-gray-700 text-white border-gray-600"
                      required
                    />
                    {errors.profile.firstName && (
                      <p className="text-red-500">{errors.profile.firstName}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 rounded bg-gray-700 text-white border-gray-600"
                      required
                    />
                    {errors.profile.lastName && (
                      <p className="text-red-500">{errors.profile.lastName}</p>
                    )}
                  </div>
                  {errors.profile.general && (
                    <p className="text-red-500">{errors.profile.general}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Update Info
                  </button>
                </form>
              )}

              {activeTab === "password" && (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 rounded bg-gray-700 text-white border-gray-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 rounded bg-gray-700 text-white border-gray-600"
                      required
                    />
                    {errors.password.password && (
                      <p className="text-red-500">{errors.password.password}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 rounded bg-gray-700 text-white border-gray-600"
                      required
                    />
                    {errors.password.confirmPassword && (
                      <p className="text-red-500">
                        {errors.password.confirmPassword}
                      </p>
                    )}
                  </div>
                  {errors.password.general && (
                    <p className="text-red-500">{errors.password.general}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Update Password
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
