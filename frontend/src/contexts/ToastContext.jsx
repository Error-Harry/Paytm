import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const showToast = (message, type) => {
    toast[type](message);
  };

  return (
    <ToastContext.Provider value={showToast}>{children}</ToastContext.Provider>
  );
};
