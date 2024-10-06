import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../Contexts/ToastContext.jsx";
import {
  validateConfirmPassword,
  validateName,
  validatePassword,
  validateUsername,
} from "../Validation.js";

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const showToast = useToast();

  const [mainError, setMainError] = useState();

  const handleFirstName = (e) => {
    setUserData({ ...userData, firstName: e.target.value });
    setErrors({ ...errors, firstName: validateName(e.target.value) });
    setMainError("");
  };

  const handleLastName = (e) => {
    setUserData({ ...userData, lastName: e.target.value });
    setErrors({ ...errors, lastName: validateName(e.target.value) });
    setMainError("");
  };

  const handleUsername = (e) => {
    setUserData({ ...userData, userName: e.target.value });
    setErrors({ ...errors, userName: validateUsername(e.target.value) });
    setMainError("");
  };

  const handlePassword = (e) => {
    setUserData({ ...userData, password: e.target.value });
    setErrors({ ...errors, password: validatePassword(e.target.value) });
    setMainError("");
  };

  const handleConfrimPassword = (e) => {
    setUserData({ ...userData, confirmPassword: e.target.value });
    setMainError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const firstNameError = validateName(userData.firstName);
    const lastNameError = validateName(userData.lastName);
    const usernameError = validateUsername(userData.userName);
    const passwordError = validatePassword(userData.password);
    const confirmPasswordError = validateConfirmPassword(
      userData.password,
      userData.confirmPassword
    );
    const newErrors = {
      firstName: firstNameError,
      lastName: lastNameError,
      userName: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      setMainError("Please correct the highlighted errors before submitting.");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.userName,
          password: userData.confirmPassword,
        }
      );

      if (res.data.token) {
        showToast(res.data.msg, "success");
        setUserData({
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({
          firstName: "",
          lastName: "",
          userName: "",
          password: "",
          confirmPassword: "",
        });
        setMainError("");
        navigate("/signin");
      } else {
        setMainError(res.data.msg);
      }
    } catch (error) {
      setMainError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-white">
          Sign Up
        </h2>

        <form method="POST" onSubmit={onSubmit}>
          <div className="flex justify-between mb-3">
            <div className="w-1/2 mr-2">
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
                placeholder="First name"
                onChange={handleFirstName}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="w-1/2 ml-2">
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
                placeholder="Last name"
                onChange={handleLastName}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
              placeholder="Username"
              autoComplete="username"
              onChange={handleUsername}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
              placeholder="Password"
              autoComplete="new-password"
              onChange={handlePassword}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
              placeholder="Confirm password"
              autoComplete="new-password"
              onChange={handleConfrimPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#5d8ae3] text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
          {mainError && (
            <p className="text-red-500 text-sm mt-1">{mainError}</p>
          )}
        </form>

        <p className="text-center mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#5d8ae3] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
