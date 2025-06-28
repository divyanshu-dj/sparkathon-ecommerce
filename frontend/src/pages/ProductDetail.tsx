
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Clock, Shield, Truck, Recycle } from "lucide-react";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<'standard' | 'nearExpiry'>('standard');
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id || '0'));
    if (foundProduct) {
      setProduct(foundProduct as Product);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = selectedVariant === 'nearExpiry' && product.nearExpiryPrice 
    ? product.nearExpiryPrice 
    : product.standardPrice;

  const savings = product.hasNearExpiry && product.nearExpiryPrice 
    ? Math.round(((product.standardPrice - product.nearExpiryPrice) / product.standardPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>•</span>
          <span className="capitalize">{product.category}</span>
          <span>•</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Pricing variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Choose Option:</h3>
              
              {/* Standard option */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedVariant === 'standard' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedVariant('standard')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Regular Price</h4>
                    <p className="text-sm text-gray-600">Full shelf life</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.standardPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Near expiry option */}
              {product.hasNearExpiry && product.nearExpiryPrice && (
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedVariant === 'nearExpiry' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedVariant('nearExpiry')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">Expiring Soon Deal</h4>
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{savings}%
                        </span>
                      </div>
                      <p className="text-sm text-orange-600 font-medium">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Expires in {product.daysToExpiry} day{product.daysToExpiry && product.daysToExpiry > 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        💡 Save money and reduce waste by buying near-expiry stock
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-orange-600">
                        ${product.nearExpiryPrice.toFixed(2)}
                      </span>
                      <div className="text-sm text-gray-400 line-through">
                        ${product.standardPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity and add to cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-lg w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart - ${(currentPrice * quantity).toFixed(2)}
                </button>
                <button className="border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>

            {/* Product benefits */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Same Day Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Recycle className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Fresh Daily</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
