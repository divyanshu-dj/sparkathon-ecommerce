
import { Search, ShoppingCart, User, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-green-50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Deliver to: Rohini, Delhi</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <span>Customer Service</span>
            <span>•</span>
            <span>Store Locator</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FreshSaver</h1>
              <p className="text-xs text-gray-500">Smart Grocery Shopping</p>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              />
            </div>
          </form>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/expiring-soon"
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              Expiring Soon
            </Link>
            
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <User className="w-5 h-5" />
              <span className="hidden md:block">Account</span>
            </button>

            <Link to="/cart" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="hidden md:block font-medium">Cart ({cartCount})</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            <Link to="/category/dairy" className="text-gray-700 hover:text-green-600 font-medium">
              Dairy
            </Link>
            <Link to="/category/bakery" className="text-gray-700 hover:text-green-600 font-medium">
              Bakery
            </Link>
            <Link to="/category/fruits-vegetables" className="text-gray-700 hover:text-green-600 font-medium">
              Fruits & Vegetables
            </Link>
            <Link to="/category/meat-poultry" className="text-gray-700 hover:text-green-600 font-medium">
              Meat & Poultry
            </Link>
            <Link to="/category/packaged-foods" className="text-gray-700 hover:text-green-600 font-medium">
              Packaged Foods
            </Link>
            <Link to="/category/beverages" className="text-gray-700 hover:text-green-600 font-medium">
              Beverages
            </Link>
            <Link to="/category/frozen-foods" className="text-gray-700 hover:text-green-600 font-medium">
              Frozen
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
