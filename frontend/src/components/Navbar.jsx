import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/UserContext.jsx";
function Navbar() {
  const { userInfo, setUserInfo } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/userInfo`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [setUserInfo]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="text-white text-xl font-bold cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Payments App
        </div>

        <div className="flex items-center space-x-4 relative">
          <span className="font-bold text-white">
            Hello, {userInfo.firstName + " " + userInfo.lastName}
          </span>
          <div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-800 font-bold cursor-pointer"
            onClick={toggleDropdown}
          >
            {userInfo.firstName.charAt(0)}
          </div>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg z-10"
            >
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  navigate("/update");
                }}
              >
                Update Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
