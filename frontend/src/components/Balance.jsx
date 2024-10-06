import React, { useState, useEffect } from "react";
import axios from "axios";

function Balance() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/account/balance`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setBalance(res.data.balance);
      } catch (err) {
        setError("Failed to fetch balance. Please try again.");
      }
    };

    fetchBalance();
  }, []);
  return (
    <div className="text-white text-lg font-semibold p-2 rounded-lg">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <span>
          Your Balance:{" "}
          <span className="font-bold">
            Rs. {balance !== null ? balance.toFixed(2) : "Loading Balance..."}
          </span>
        </span>
      )}
    </div>
  );
}

export default Balance;
