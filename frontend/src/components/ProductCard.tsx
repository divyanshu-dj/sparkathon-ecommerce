
import { Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  standardPrice: number;
  hasNearExpiry: boolean;
  nearExpiryPrice?: number;
  daysToExpiry?: number;
}

interface ProductCardProps {
  product: Product;
  showDiscountedPrice?: boolean;
}

const ProductCard = ({ product, showDiscountedPrice = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const displayPrice = showDiscountedPrice && product.hasNearExpiry 
    ? product.nearExpiryPrice 
    : product.standardPrice;

  const savings = product.hasNearExpiry && product.nearExpiryPrice 
    ? Math.round(((product.standardPrice - product.nearExpiryPrice) / product.standardPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = showDiscountedPrice && product.hasNearExpiry ? 'nearExpiry' : 'standard';
    addToCart(product, variant, 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {showDiscountedPrice && product.hasNearExpiry && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{savings}%
              </div>
            )}
          </div>

          {/* Near expiry indicator for regular listings */}
          {!showDiscountedPrice && product.hasNearExpiry && (
            <div className="absolute top-2 right-2">
              <div className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Deal Available
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {showDiscountedPrice && product.hasNearExpiry ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">
                    ${product.nearExpiryPrice?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.standardPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  ${displayPrice?.toFixed(2)}
                </span>
              )}
              
              {showDiscountedPrice && product.daysToExpiry && (
                <p className="text-xs text-orange-600 font-medium mt-1">
                  Expires in {product.daysToExpiry} day{product.daysToExpiry > 1 ? 's' : ''}
                </p>
              )}
            </div>

            <button 
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {!showDiscountedPrice && product.hasNearExpiry && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-orange-600 font-medium">
                💡 Save up to {savings}% with expiring deal
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
