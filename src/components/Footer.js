'use client';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </motion.div>
          
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/fruits" className="text-gray-300 hover:text-white">Fruits</Link></li>
              <li><Link href="/category/vegetables" className="text-gray-300 hover:text-white">Vegetables</Link></li>
              <li><Link href="/category/dairy" className="text-gray-300 hover:text-white">Dairy Products</Link></li>
              <li><Link href="/category/bakery" className="text-gray-300 hover:text-white">Bakery Items</Link></li>
              <li><Link href="/category/beverages" className="text-gray-300 hover:text-white">Beverages</Link></li>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2" />
                <span>123 Grocery Street, Food City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>support@webshop.com</span>
              </li>
            </ul>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='footerlogo_container'
          >
             <Link href="/" >
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="logo_container"
            />
         
         </Link>

            <p className="text-gray-300 mb-4">
              We deliver fresh groceries and food items right to your doorstep. Quality products, timely delivery, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white"><FaFacebook /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FaTwitter /></a>
              <a href="#" className="text-gray-300 hover:text-white"><FaInstagram /></a>
            </div>
          </motion.div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-300">© {new Date().getFullYear()} webShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
