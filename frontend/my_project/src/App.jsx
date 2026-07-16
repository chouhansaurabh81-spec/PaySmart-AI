import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/payment" element={<Payment />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/transactions" element={<Transactions />} />

    </Routes>
  );
}

export default App;