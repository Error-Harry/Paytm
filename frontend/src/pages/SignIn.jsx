import React, { useState } from "react";
import { Link } from "react-router-dom";

const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;

  if (!username.trim()) return "Username is required";
  if (!usernameRegex.test(username))
    return "Username can only contain letters, numbers, underscores, periods, or hyphens";
  if (/\s/.test(username)) return "Username cannot contain spaces";

  return null;
};

const validatePassword = (password) => {
  if (!password) return "Password is required";

  return null;
};

function SignIn() {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: null,
    password: null,
  });

  const handleUsername = (e) => {
    const userName = e.target.value;
    setUserData({ ...userData, userName });
    setErrors({ ...errors, userName: validateUsername(userName) });
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setUserData({ ...userData, password });
    setErrors({ ...errors, password: validatePassword(password) });
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-center mb-4 text-white">
          Sign In
        </h2>
        <form onSubmit={onSubmit}>
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
