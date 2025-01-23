'use client';
import React from 'react';
import Image from 'next/image';
import doe from './../public/images/doe.png'
import bell from './../public/icons/bell.svg'
import { useAuthStore } from '@/app/store/authStore';

export const Header = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div>
      <header className="bg-white shadow-md p-4 flex gap-24 md:gap-64 lg:gap-96 items-center w-full md:ml-64 lg:ml-64 fixed top-0 z-10">
        <div className="text-gray-800">
          <h1 className="text-lg font-semibold text-nowrap">Hey there!</h1>
          {user && <p className="text-sm text-gray-600 text-nowrap">Welcome back, {user.firstName}</p>}
        </div>
        <div className="flex items-center space-x-2 lg:space-x-4 lg:pl-60 xl:pl-80">
          <button className="relative">
            <Image src={bell} alt="notification" className="material-icons " />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-1 lg:space-x-3">
            <Image
              src={doe}
              alt="Profile Picture"
              className="w-10 h-10 rounded-full object-cover"
            />
            {user && <span className="text-gray-800 font-medium text-sm">{user.firstName} {user.lastName}</span>}
          </div>
        </div>
      </header>
    </div>
  );
};