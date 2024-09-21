import React, { useState } from "react";
import { Link } from "react-router-dom";

const validateName = (name) => {
  const nameRegex = /^[a-zA-ZàâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ'-]+$/;

  if (!name.trim()) {
    return "This field is required";
  }
  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }
  if (!nameRegex.test(name)) {
    return "Name can only contain letters, hyphens, and apostrophes";
  }
  return null;
};

const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
  const consecutiveSpecialCharRegex = /([._-])\1/;

  if (!username.trim()) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (username.length > 20) return "Username cannot exceed 20 characters";
  if (!usernameRegex.test(username))
    return "Username can only contain letters, numbers, underscores, periods, or hyphens";
  if (/\s/.test(username)) return "Username cannot contain spaces";
  if (consecutiveSpecialCharRegex.test(username))
    return "Username cannot contain consecutive periods, underscores, or hyphens";
  if (/^[._-]/.test(username))
    return "Username cannot start with a period, underscore, or hyphen";
  if (/[._-]$/.test(username))
    return "Username cannot end with a period, underscore, or hyphen";

  return null;
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters long";
  if (password.length > 64) return "Password cannot exceed 64 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character";
  if (/\s/.test(password)) return "Password cannot contain spaces";

  return null;
};
const validateConfrimPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return "Passwords do not match";

  return null;
};

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

  const handleFirstName = (e) => {
    setUserData({ ...userData, firstName: e.target.value });
    setErrors({ ...errors, firstName: validateName(e.target.value) });
  };

  const handleLastName = (e) => {
    setUserData({ ...userData, lastName: e.target.value });
    setErrors({ ...errors, lastName: validateName(e.target.value) });
  };

  const handleUsername = (e) => {
    setUserData({ ...userData, userName: e.target.value });
    setErrors({ ...errors, userName: validateUsername(e.target.value) });
  };

  const handlePassword = (e) => {
    setUserData({ ...userData, password: e.target.value });
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  const handleConfrimPassword = (e) => {
    setUserData({ ...userData, confirmPassword: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
