import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../Contexts/ToastContext.jsx";
import { validateSignInPassword, validateUsername } from "../Validation.js";

function SignIn() {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: null,
    password: null,
  });

  const navigate = useNavigate();
  const showToast = useToast();

  const [mainError, setMainError] = useState();

  const handleUsername = (e) => {
    const userName = e.target.value;
    setUserData({ ...userData, userName });
    setErrors({ ...errors, userName: validateUsername(userName) });
    setMainError("");
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setUserData({ ...userData, password });
    setErrors({ ...errors, password: validateSignInPassword(password) });
    setMainError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const usernameError = validateUsername(userData.userName);
    const passwordError = validateSignInPassword(userData.password);
    const newErrors = {
      userName: usernameError,
      password: passwordError,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) {
      setMainError("Please correct the highlighted errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
        username: userData.userName,
        password: userData.password,
      });

      if (res.data.token) {
        showToast(res.data.msg, "success");
        localStorage.setItem("token", res.data.token);
        setUserData({
          userName: "",
          password: "",
        });
        setErrors({
          userName: "",
          password: "",
        });
        setMainError("");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMainError(error.response.data.msg);
      } else {
        setMainError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-white">
          Sign In
        </h2>
        <form method="POST" onSubmit={onSubmit}>
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
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
              placeholder="Password"
              autoComplete="current-password"
              onChange={handlePassword}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#5d8ae3] text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          {mainError && (
            <p className="text-red-500 text-sm mt-1">{mainError}</p>
          )}
        </form>
        <p className="text-center mt-4 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#5d8ae3] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
