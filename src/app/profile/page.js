'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { FaUser, FaEnvelope, FaPhone, FaShoppingBag, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user, loading, getProfile } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!loading && !user) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }
      
      if (user) {
        try {
          // Get full profile data
          const data = await getProfile();
          setProfileData(data || user);
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProfile();
  }, [user, loading, router, getProfile]);
  
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Redirect handled in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="bg-primary py-6 px-4 text-center">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-opacity-80">Manage your account information</p>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="bg-gray-100 rounded-full h-32 w-32 flex items-center justify-center">
                <FaUser className="text-4xl text-gray-400" />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 mt-6 md:mt-0">
              <h2 className="text-xl font-semibold">{profileData?.fullName}</h2>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p>{profileData?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaPhone className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p>{profileData?.mobileNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Default Address</p>
                    <p>{profileData?.address || 'No address added yet'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaShoppingBag className="text-primary mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p>{profileData?.orders || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white border border-primary text-primary px-4 py-2 rounded-lg"
                  onClick={() => router.push('/change-password')}
                >
                  Change Password
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}