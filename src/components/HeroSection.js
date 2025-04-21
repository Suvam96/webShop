'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="bg-gray-100 py-1">
      <div className="container mx-auto px-1">
        <div className="flex flex-col md:flex-row items-center header_banner">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 mb-8 ml-4 md:mb-0"
          >
            <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
              Fresh Groceries <br />
              <span className="text-white">Delivered to You</span>
            </h1>
            <p className="text-lg text-white mb-6">
              Shop for fresh fruits, vegetables, and daily essentials from the comfort of your home.
            </p>
            <div className="flex space-x-4 text-white">
              <Link href="/products" className="btn-primary hero_button">
                Shop Now
              </Link>
              <Link href="/categories" className="btn-outline hero_button">
                Browse Categories
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            {/* <img 
              src="/images/grocessorybanner.png" 
              alt="Fresh groceries" 
              className="rounded-lg shadow-lg w-full h-auto"
            /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}