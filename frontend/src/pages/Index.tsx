
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
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

const Index = () => {
  const [products] = useState<Product[]>(productsData);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get featured products (first 12 products)
    setFeaturedProducts(products.slice(0, 12));
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />

      {/* Featured products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Fresh quality products at great prices</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Save Money and Reduce Waste?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Browse our expiring soon deals and help reduce food waste while saving on quality groceries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop All Products
            </a>
            <a
              href="/expiring-soon"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              View Expiring Deals
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
