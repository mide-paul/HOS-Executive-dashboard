'use client'
import React from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import document from '../../public/icons/document.svg'
import line_dark from '../../public/icons/line_dark.png'
import ClientData from '@/components/ClientsData';
import RevenueComp from '@/components/RevenueComp';
import CompliantComp from '@/components/CompliantComp';
import EventCalendar from '@/components/EventScheduler';

const dashboard = () => {
    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl min-h-[880px] bg-white lg:mt-14 lg:ml-64 2xl:w-max-w-7xl rounded'>
                <div>
                    <h3 className='font-normal text-blue-950 text-sm pt-16 ml-8 lg:pt-8 lg:ml-7'>Bonus and Commission Progress</h3>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='w-56 h-20 bg-gray-50 rounded-md mt-5 ml-8 lg:ml-7 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={document}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-sm'>Total earned</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-48 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-base'>478</h3>
                        </div>
                        <div className='w-56 h-20 bg-gray-50 rounded-md mt-5 ml-8 lg:ml-0 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={document}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-sm'>Total earned</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-48 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-base'>478</h3>
                        </div>
                        <div className='w-56 h-20 bg-gray-50 rounded-md mt-5 ml-8 lg:ml-0 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={document}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-sm'>Total earned</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-48 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-base'>478</h3>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-6'>
                    <div className='flex flex-col'>
                        <div>
                            <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-7'>Client Acquisition Rate</h3>
                            <div className='w-80 lg:w-full h-60 pl-5 pr-5 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6'>
                                <ClientData />
                            </div>
                        </div>

                        <div>
                            <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-7'>Revenue</h3>
                            <div className='w-80 lg:min-w-full h-72 pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6'>
                                <RevenueComp />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-7'> Compliance Rate of Clients</h3>
                        <div className='w-80 lg:w-72 min-h-[590px] pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6 pb-56 lg:pb-0'>
                            <CompliantComp />
                        </div>
                    </div>

                    <div className='-mt-36'>
                        <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-0.5 pt-36 lg:pt-0'>Upcoming Events</h3>
                        <div className='w-80 lg:w-64 min-h-[732px] pl-0 pt-4 bg-white shadow rounded-md ml-6 lg:ml-0.5 mt-6'>
                            <div className='h-6 w-72 lg:w-56 ml-4 p-1 justify-center text-center bg-blue-950 rounded text-xs text-white'>Create Event</div>
                            <EventCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dashboard