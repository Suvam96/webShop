'use client';

import { FaLeaf, FaTruck, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import HeroSection from '@/components/HeroSection';
import { motion } from 'framer-motion';


export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Bananas",
      price: 2.99,
      oldPrice: 3.99,
      image: "/images/banana.png",
      discount: "25%",
      rating: 4.5,
      reviews: 120,
      unit: "1 kg"
    },
    {
      id: 2,
      name: "Fresh Strawberries",
      price: 4.99,
      oldPrice: 5.99,
      image:"/images/strawberry.png",
      discount: "17%",
      rating: 4.8,
      reviews: 95,
      unit: "250 g"
    },
    {
      id: 3,
      name: "Whole Wheat Bread",
      price: 3.49,
      oldPrice: null,
      image:"/images/bread.png",
      discount: null,
      rating: 4.2,
      reviews: 68,
      unit: "400 g"
    },
    {
      id: 4,
      name: "Farm Fresh Eggs",
      price: 5.99,
      oldPrice: 7.99,
      image:"/images/egg.png",
      discount: "25%",
      rating: 4.9,
      reviews: 210,
      unit: "12 pcs"
    }
  ];
  
  const popularCategories = [
    { id: 1, name: "Fruits", image:"/images/fruits.png", count: 45 },
    { id: 2, name: "Vegetables", image:"/images/vegetable.jpg", count: 62 },
    { id: 3, name: "Dairy", image:"/images/egg.png", count: 28 },
    { id: 4, name: "Bakery", image:"/images/egg.png", count: 36 },
    { id: 5, name: "Beverages", image:"/images/egg.png", count: 51 },
    { id: 6, name: "Snacks", image:"/images/egg.png", count: 49 }
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <>
      <HeroSection />
      
      {/* Features */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FaLeaf className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">100% Fresh</h3>
                <p className="text-sm text-gray-600">Guaranteed fresh products</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FaTruck className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FaMoneyBillWave className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-gray-600">Affordable prices for quality</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <FaHeadset className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-600">Customer service always available</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl font-bold mb-6 text-center"
          >
            Shop by Category
          </motion.h2>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {popularCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold"
            >
              Featured Products
            </motion.h2>
            
            <motion.a 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              href="/products" 
              className="text-primary hover:underline"
            >
              View All
            </motion.a>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Special Offer Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-primary rounded-lg offer_section overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Special Offer</h2>
                <p className="text-white text-lg mb-6">Get 30% off on your first order. Use code: WEBSHOP30</p>
                <a href="/products" className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                  Shop Now
                </a>
              </div>
              {/* <div className="md:w-1/2">
                <img src="/images/egg.png" alt="Special offer" className="w-full h-auto" />
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
