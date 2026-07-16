import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 shadow-md">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-purple-600">
        PaySmart AI
      </h1>

      {/* Menu */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
        <li className="cursor-pointer hover:text-purple-600"><Link to="/">Home</Link></li>
        <li className="cursor-pointer hover:text-purple-600"><Link to="/">Features</Link></li>
        <li className="cursor-pointer hover:text-purple-600"><Link to="/">Pricing</Link></li>
        <li className="cursor-pointer hover:text-purple-600"><Link to="/">About</Link></li>
        <li className="cursor-pointer hover:text-purple-600"><Link to="/">Contact</Link></li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link to="/login">
        <button className="border border-purple-600 text-purple-600 px-5 py-2 rounded-lg hover:bg-purple-100">
          Login
        </button>
        </Link>

        <Link to="/Sign Up">
        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
          Sign Up
        </button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;