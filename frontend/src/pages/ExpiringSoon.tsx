
import { useState, useEffect } from "react";
import { Clock, Filter } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  standardPrice: number;
  description: string;
  hasNearExpiry: boolean;
  nearExpiryPrice?: number;
  daysToExpiry?: number;
  expiryDate?: string;
}

const ExpiringSoon = () => {
  const [expiringProducts, setExpiringProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('expiry');

  useEffect(() => {
    // Filter products that have near expiry deals
    const expiring = productsData.filter(product => product.hasNearExpiry) as Product[];
    setExpiringProducts(expiring);
    setFilteredProducts(expiring);
  }, []);

  useEffect(() => {
    let filtered = [...expiringProducts];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'expiry':
          return (a.daysToExpiry || 0) - (b.daysToExpiry || 0);
        case 'discount':
          const savingsA = a.nearExpiryPrice ? ((a.standardPrice - a.nearExpiryPrice) / a.standardPrice) * 100 : 0;
          const savingsB = b.nearExpiryPrice ? ((b.standardPrice - b.nearExpiryPrice) / b.standardPrice) * 100 : 0;
          return savingsB - savingsA;
        case 'price':
          return (a.nearExpiryPrice || 0) - (b.nearExpiryPrice || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [expiringProducts, selectedCategory, sortBy]);

  const categories = ['All', ...Array.from(new Set(expiringProducts.map(p => p.category)))];

  const totalSavings = expiringProducts.reduce((total, product) => {
    if (product.nearExpiryPrice) {
      return total + (product.standardPrice - product.nearExpiryPrice);
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Expiring Soon Deals</h1>
          </div>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Save money and help reduce food waste with our discounted near-expiry products. 
            Same quality, better price!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{expiringProducts.length}</div>
              <div className="text-orange-100">Products Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">Up to 50%</div>
              <div className="text-orange-100">Savings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">${totalSavings.toFixed(0)}</div>
              <div className="text-orange-100">Total Potential Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filter & Sort:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                >
                  <option value="expiry">Days to Expiry</option>
                  <option value="discount">Highest Discount</option>
                  <option value="price">Lowest Price</option>
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredProducts.length} of {expiringProducts.length} deals
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  showDiscountedPrice={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new deals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Expiring Soon Deals?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">Get the same quality products at discounted prices, helping you stretch your grocery budget.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reduce Waste</h3>
              <p className="text-gray-600">Help reduce food waste by purchasing products that are still fresh but approaching their expiry date.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Same Quality</h3>
              <p className="text-gray-600">All products maintain the same high quality standards - they're just closer to their expiry date.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpiringSoon;
