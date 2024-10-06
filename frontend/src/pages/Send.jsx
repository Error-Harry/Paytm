import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../Contexts/ToastContext.jsx";
import axios from "axios";

function Send() {
  const { userId } = useParams();
  const [amount, setAmount] = useState("");
  const [mainError, setMainError] = useState();
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });
  const showToast = useToast();
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransfer = async () => {
    try {
      const parsedAmount = parseFloat(amount);
      alert(
        `You are about to transfer Rs. ${parsedAmount} to ${userInfo.firstName} ${userInfo.lastName}.`
      );

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/account/transfer`,
        { to: userId, amount: parsedAmount },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      showToast(res.data.msg, "success");
      setAmount("");
      navigate("/");
    } catch (error) {
      setMainError(
        "Transfer failed: " + error.response?.data?.msg || "Unknown error"
      );
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/userInfo`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            params: {
              id: userId,
            },
          }
        );
        setUserInfo(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Send Money
          </h2>

          <div className="mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-800 font-bold text-xl">
                {userInfo.firstName.charAt(0)}
              </div>
              <span className="text-white text-lg font-semibold ml-4 capitalize">
                {userInfo.firstName + " " + userInfo.lastName}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2" htmlFor="amount">
              Enter Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="w-full px-2 py-2 border-b-2 border-gray-500 bg-transparent text-white focus:outline-none focus:border-[#5d8ae3]"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>

          <button
            className="w-full bg-[#5d8ae3] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={handleTransfer}
          >
            Initiate Transfer
          </button>
          {mainError && (
            <p className="text-red-500 text-sm mt-1">{mainError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Send;
