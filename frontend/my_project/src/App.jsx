import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";

import Expense from "./pages/Expense";

import Income from "./pages/Income";

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

      <Route path="/income" element={<Income />} />

      <Route path="/expense" element={<Expense />} />

      <Route path="/analytics" element={<Analytics />} />

    </Routes>
  );
}

export default App;