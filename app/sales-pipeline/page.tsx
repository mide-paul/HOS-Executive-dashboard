'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import ClientTable from '@/components/ClientTableComp';

const sales = () => {
    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='w-screen h-full mt-14 lg:max-w-5xl lg:min-h-[500px] bg-white pt-1 pb-1 pr-5 mr-8 md:ml-64 md:mt-8 lg:mt-14 lg:ml-72 2xl:w-max-w-7xl rounded'>
                <div className='mt-3 ml-0 mr-0 min-h-[500px] w-screen lg:ml-4 lg:max-w-[990px] lg:h-screen bg-white shadow-md rounded'>
                    <ClientTable />
                </div>
            </div>
        </div>
    )
}

export default sales
export const dynamic = "force-dynamic";