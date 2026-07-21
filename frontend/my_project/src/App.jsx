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

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

      <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>}/>

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>}/>

      <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>}/>

      <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>}/>

      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>}/>

    </Routes>
  );
}

export default App;