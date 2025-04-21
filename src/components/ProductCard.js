'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div variants={item} className="card">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
        </Link>
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-secondary text-dark text-sm font-bold px-2 py-1 rounded">
            {product.discount} OFF
          </div>
        )}
        
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          <FaHeart className={isWishlisted ? "text-red-500" : "text-gray-400"} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} 
                size={14} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">{product.reviews} reviews</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-bold text-lg">${product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-sm ml-2">
                ${product.oldPrice}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>
        
        <button className="w-full  text-white py-2 rounded flex items-center justify-center bg-green-600 transition">
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
