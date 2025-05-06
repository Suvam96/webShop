"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoryCard({ category }) {
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div variants={item} className="bg-white shadow">
      <Link href="/" className="block">
        <div className=" rounded-lg shadow hover:shadow-md transition p-4 text-center">
          <div className="w-24 h-24 mx-auto mb-3 overflow-hidden rounded-full">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-medium">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.count} items</p>
        </div>
      </Link>
    </motion.div>
  );
}
