import React, { useState, useEffect } from "react";
import axios from "axios";
import Balance from "./Balance";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async (filter = "") => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/bulk", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          params: { filter },
        });
        setUsers(res.data.user);
      } catch (err) {
        setError("Failed to fetch users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(debouncedSearch);
  }, [debouncedSearch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSendMoney = (userId) => {
    navigate(`/send/${userId}`);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6 space-y-6">
      <Balance />

      <hr className="border-t-2 border-gray-600" />

      <div className="mb-4 flex justify-end">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search users..."
            className="p-2 border rounded pl-10 w-full"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

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
      ) : currentUsers.length > 0 ? (
        currentUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-4 rounded-lg shadow-lg"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-800 font-bold text-xl">
              {user.firstName.charAt(0)}
            </div>
            <span className="text-white text-lg font-semibold ml-4">
              {user.firstName + " " + user.lastName}
            </span>
            <button
              className="ml-auto bg-[#5d8ae3] hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 shadow-md"
              onClick={() => handleSendMoney(user._id)}
            >
              Send Money
            </button>
          </div>
        ))
      ) : (
        <div className="text-white">No users found.</div>
      )}
      {currentUsers.length > 0 && !loading && !error && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Users;
