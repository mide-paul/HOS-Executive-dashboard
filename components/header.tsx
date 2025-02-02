'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/app/store/authStore';
import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import doe from './../public/images/doe.png';
import bell from './../public/icons/bell.svg';
import line from './../public/icons/line_dark.png';
import question_circle from './../public/icons/question_circle.svg';

export const Header = () => {
  const user = useAuthStore(state => state.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { logout, error } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    setShowConfirmModal(true);
  };

  const confirmLogout = async () => {
    setShowConfirmModal(false);
    try {
      await logout();
      router.push('/');
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex gap-8 md:gap-64 lg:gap-96 items-center w-full md:ml-64 lg:ml-64 fixed top-0 z-20">
        <div className="text-gray-800">
          <h1 className="text-lg font-semibold text-nowrap">Hey there!</h1>
          {user && <p className="text-sm text-gray-600 text-nowrap">Welcome back, {user.firstName}</p>}
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4 lg:pl-60 xl:pl-80 relative">
          <button className="relative">
            <Image src={bell} alt="notification" className="material-icons" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 lg:space-x-3 focus:outline-none"
            >
              <Image src={doe} alt="Profile Picture" className="w-10 h-10 rounded-full object-cover" />
              {user && <span className="text-gray-800 font-medium text-sm max-w-10 lg:max-w-24">{user.firstName} {user.lastName}</span>}
            </button>
            {dropdownOpen && (
              <div className="absolute pr-5 right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className='flex gap-2 mt-3 px-4'>
                  <Image src={doe} alt="Profile Picture" className="w-10 h-10 rounded-full object-cover" />
                  <div className='flex flex-col gap-1'>
                  {user && <span className="text-gray-800 font-medium text-xs text-nowrap max-w-10 lg:max-w-24">{user.firstName} {user.lastName}</span>}
                  {user && <span className="text-gray-400 font-normal text-xs max-w-10 lg:max-w-24 pb-2">{user.email}</span>}
                  </div>
                </div>
                <Image src={line} alt="Profile Picture" className="w-44 h-0.5 ml-4 mt-1 rounded-full object-cover" />
                <a href="/profile" className="flex items-center px-4 py-2 mt-2 w-screen text-xs text-gray-700 hover:bg-gray-100">
                  <User className="w-4 h-4 mr-2" /> View Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="w-screen flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
                {error && <p className="text-red-600 text-center font-semibold mt-2">{error}</p>}
              </div>
            )}
          </div>
        </div>
      </header>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <Image src={question_circle} alt="Profile Picture" className="w-16 h-16 p-1 ml-20 bg-gray-300 rounded-full object-cover" />
            <p className="text-sm font-semibold pt-4 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 text-sm text-blue-950 border bg-white rounded-md hover:bg-gray-100">Cancel</button>
              <button onClick={confirmLogout} className="px-4 py-2 text-sm bg-blue-950 text-white rounded-md hover:bg-blue-900">Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};