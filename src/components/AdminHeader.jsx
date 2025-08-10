import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login"); 
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-stone-100 text-stone-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-stone-600 transition">Home</Link>
          <Link to="/products" className="hover:text-stone-800 transition">Products</Link>
          <Link to="/categories" className="hover:text-stone-800 transition">Categories</Link>
          <Link to="/orders" className="hover:text-stone-800 transition">Orders</Link>
          <button
            onClick={handleAuthClick}
            className="px-3 py-1 rounded bg-stone-200 hover:bg-stone-300 transition-colors cursor-pointer text-sm"
          >
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </button>
        </nav>

        <button onClick={toggleMenu} className="md:hidden text-stone-700">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-stone-100 px-4 pb-4 space-y-2 text-sm">
          <Link to="/" onClick={toggleMenu} className="block py-2 px-2 rounded hover:bg-stone-200">Home</Link>
          <Link to="/products" onClick={toggleMenu} className="block py-2 px-2 rounded hover:bg-stone-200">Products</Link>
          <Link to="/categories" onClick={toggleMenu} className="block py-2 px-2 rounded hover:bg-stone-200">Categories</Link>
          <Link to="/orders" onClick={toggleMenu} className="block py-2 px-2 rounded hover:bg-stone-200">Orders</Link>
          <button
            onClick={() => {
              handleAuthClick();
              toggleMenu();
            }}
            className="block w-full text-left py-2 px-2 rounded hover:bg-stone-200"
          >
            {isLoggedIn ? "Sign Out" : "Sign In"}
          </button>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;
