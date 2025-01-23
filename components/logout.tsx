'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';

export const Logout = () => {
    const { logout, error } = useAuthStore();  // Include error from the store
    const router = useRouter();

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        try {
            await logout();
            router.push('/');
        } catch (err) {
            console.error("Logout failed: ", err);
        }
    };

    return (
        <div
            className="absolute flex ml-8 lg:flex-row lg:ml-9 mt-96 pt-11 w-20 h-6.5 items-center gap-0 cursor-pointer"
            onClick={handleLogout}
        >
            <span className="material-icons mr-3">logout</span>
            <h3 className="text-dark text-xs font-normal">
                Logout
            </h3>
            {error && <p className="text-red-600 text-center font-semibold mt-2">{error}</p>}
        </div>
    );
};