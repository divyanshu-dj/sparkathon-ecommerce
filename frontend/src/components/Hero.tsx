
import { Clock, Shield, Recycle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Fresh Groceries
                <span className="block text-green-600">Smart Savings</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover quality products at great prices. Save money and reduce waste with our expiring soon deals.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fresh Quality Products</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Discount Deals</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expiring Soon Savings</h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reduce Food Waste</h3>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/expiring-soon"
                className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Clock className="w-5 h-5" />
                View Expiring Deals
              </Link>
            </div>
          </div>

          {/* Right content - Deal card with wider design and tilt effect */}
          <div className="lg:flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full hover:rotate-2 transition-transform duration-300 ease-in-out transform">
              <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Save up to 50%
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Today's Fresh Deals</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900">Fresh Organic Milk</p>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">Now $2.99</span>
                        <span className="text-gray-400 line-through text-sm">$3.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    NEW
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900">Artisan Bread</p>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 font-bold">$1.49</span>
                        <span className="text-gray-400 line-through text-sm">$2.99</span>
                      </div>
                      <p className="text-xs text-gray-500">Expires in 2 days</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900">Greek Yogurt</p>
                      <span className="text-blue-600 font-bold">$4.99</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="bg-green-600 text-white text-center py-2 rounded-lg font-medium">
                  Fresh Daily
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
