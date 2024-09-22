import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Send from "./pages/Send.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import { ToastProvider } from "./Contexts/ToastContext.jsx";
import PrivateRoute from "./ProtectedRoutes.jsx";
import Navbar from "./components/Navbar.jsx";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const showNavbar = !["/signin", "/signup"].includes(location.pathname);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Payment App | Dashboard";
        break;
      case "/signin":
        document.title = "Payment App | Sign In";
        break;
      case "/signup":
        document.title = "Payment App | Sign Up";
        break;
      case "/update":
        document.title = "Payment App | Update Info";
        break;
      default:
        document.title = "Payment App";
    }
  }, [location.pathname]);

  return (
    <UserProvider>
      <ToastProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/send/:userId"
            element={
              <PrivateRoute>
                <Send />
              </PrivateRoute>
            }
          />
          <Route
            path="/update"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </ToastProvider>
    </UserProvider>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
