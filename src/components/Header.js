"use client";

import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import UserProfileMenu from "./UserProfileMenu";
import { useAuth } from "@/lib/authContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center py-1">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center "
          >
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="logo_container"
              />
            </Link>
          </motion.div>

          {/* Search Bar - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex flex-grow max-w-xl mx-4 ml-auto"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for groceries, vegetables, fruits..."
                className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
                <FaSearch />
              </button>
            </div>
          </motion.div>

          {/* Navigation Icons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <Link
              href="/wishlist"
              className="text-dark hover:text-primary hidden sm:block"
            >
              <FaHeart className="text-xl" />
            </Link>
            <Link href="/cart" className="text-dark hover:text-primary">
              <div className="relative">
                <FaShoppingCart className="text-xl" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>

            {/* User Profile Menu - Replace FaUser with UserProfileMenu */}
            <div className="hidden sm:block">
              <UserProfileMenu />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="text-dark hover:text-primary md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="text-xl" />
            </button>
          </motion.div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="pb-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-2"
          >
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="px-4 py-2 hover:">
                Home
              </Link>
              <Link href="/categories" className="px-4 py-2 hover:">
                Categories
              </Link>
              <Link href="/offers" className="px-4 py-2 hover:">
                Offers
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="px-4 py-2 hover:">
                    My Profile
                  </Link>
                  <Link href="/orders" className="px-4 py-2 hover:">
                    My Orders
                  </Link>
                  <button
                    className="px-4 py-2 text-left hover:"
                    onClick={() => {
                      const { logout } = useAuth();
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 hover:">
                    Login
                  </Link>
                  <Link href="/register" className="px-4 py-2 hover:">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}

        {/* Categories Navigation */}
        <div className="hidden md:block border-t border-gray-200">
          <nav className="flex space-x-6 py-2">
            <Link href="/" className="text-dark hover:text-primary">
              Fruits
            </Link>
            <Link href="/" className="text-dark hover:text-primary">
              Vegetables
            </Link>
            <Link href="/" className="text-dark hover:text-primary">
              Dairy
            </Link>
            <Link href="/" className="text-dark hover:text-primary">
              Bakery
            </Link>
            <Link href="/" className="text-dark hover:text-primary">
              Snacks
            </Link>
            <Link href="/" className="text-dark hover:text-primary">
              Beverages
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
