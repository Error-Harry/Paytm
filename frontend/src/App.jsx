import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/signUp";
import Send from "./pages/Send";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route index element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
