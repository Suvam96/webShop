'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaSignOutAlt, FaShoppingBag, FaAddressCard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/authContext';

export default function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="text-dark hover:text-primary flex items-center space-x-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaUser className="text-xl" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50"
          >
            {user ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <p className="font-medium text-gray-800">{user.fullName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                
                <div className="py-2">
                  <Link 
                    href="/profile" 
                    className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUser className="text-gray-500" />
                    <span>My Profile</span>
                  </Link>
                  
                  <Link 
                    href="/orders" 
                    className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaShoppingBag className="text-gray-500" />
                    <span>My Orders</span>
                  </Link>
                  
                  <Link 
                    href="/addresses" 
                    className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaAddressCard className="text-gray-500" />
                    <span>My Addresses</span>
                  </Link>
                  
                  <button 
                    className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors text-left"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="text-gray-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="py-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2 block hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 block hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}