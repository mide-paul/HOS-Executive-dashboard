'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import money_bag from '../../public/icons/money_bag.svg'
import line_dark from '../../public/icons/line_dark.png'
import RevenueYearly from '@/components/RevenueYearly';
import UpcomingPayouts from '@/components/UpcomingPayouts';

const Financial = () => {
    const [currentView, setCurrentView] = useState('RevenueYearly');
    
    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl lg:h-screen bg-white lg:mt-14 md:ml-64 lg:ml-64 2xl:w-max-w-7xl rounded'>
                <div>
                    <h3 className='font-normal text-blue-950 text-sm pt-16 ml-6 lg:pt-8 lg:ml-7'>Bonuses earned</h3>
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-7 pt-3 pr-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={money_bag}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs'>Total bonus earned from client aquition</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-52 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                        </div>
                        <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-0 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={money_bag}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs'>Total bonus earned from CDL program partnership</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-52 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                        </div>
                        <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-0 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={money_bag}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs'>Total bonus earned from ELD API integrations</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-52 h-0.1 mt-2 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                        </div>
                        <div className='w-60 h-24 bg-gray-50 rounded-md mt-5 ml-6 lg:ml-0 pt-3'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src={money_bag}
                                    alt=""
                                    className="w-4 h-4 ml-3 object-cover"
                                />
                                <h3 className='font-normal text-black text-xs'>Regulatory achievements</h3>
                            </div>
                            <Image
                                src={line_dark}
                                alt=""
                                className="w-52 h-0.1 mt-7 ml-3.5 object-cover"
                            />
                            <h3 className='text-black font-medium ml-3 mt-2 text-sm lg:text-sm'>$800</h3>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className='font-normal text-blue-950 text-sm pt-16 ml-6 lg:pt-8 lg:ml-7'>Commission earned</h3>
                    <div className='ml-6 lg:ml-8 mt-4 pt-1 pl-4 bg-white w-80 lg:min-w-[1000px] h-64 lg:h-32 shadow rounded'>
                        <div className='flex flex-col lg:flex-row gap-7'>
                            <div className='w-72 lg:min-w-[465px] h-24 bg-gray-50 rounded-md mt-3 ml-0 lg:ml-1 pt-3 pr-8'>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={money_bag}
                                        alt=""
                                        className="w-4 h-4 ml-7 object-cover"
                                    />
                                    <h3 className='font-normal text-black text-xs max-w-44'>Total commission earned from training sales</h3>
                                </div>
                                <Image
                                    src={line_dark}
                                    alt=""
                                    className="max-w-[230px] lg:max-w-[405px] h-0.1 mt-2 ml-7 object-cover"
                                />
                                <h3 className='text-black font-medium ml-7 mt-2 text-sm lg:text-sm'>$800</h3>
                            </div>
                            <div className='w-72 lg:min-w-[465px] h-24 bg-gray-50 rounded-md mt-0 lg:mt-3 ml-0 lg:ml-0 pt-3 pr-8'>
                                <div className='flex items-center gap-2'>
                                    <Image
                                        src={money_bag}
                                        alt=""
                                        className="w-4 h-4 ml-7 object-cover"
                                    />
                                    <h3 className='font-normal text-black text-xs max-w-44'>Total commission earned from training sales</h3>
                                </div>
                                <Image
                                    src={line_dark}
                                    alt=""
                                    className="max-w-[230px] lg:max-w-[405px] h-0.1 mt-2 ml-7 object-cover"
                                />
                                <h3 className='text-black font-medium ml-7 mt-2 text-sm lg:text-sm'>$800</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex flex-col">
                        <div className="flex mt-4 ml-4">
                            {/* Revenue and Upcoming Payouts links */}
                            <h3
                                className={`font-medium text-xs mt-5 ml-6 lg:ml-7 ${
                                    currentView === 'RevenueYearly' ? 'text-blue-950' : 'text-gray-500'
                                }`}
                                onClick={() => setCurrentView('RevenueYearly')}
                                style={{ cursor: 'pointer' }}
                            >
                                Revenue
                            </h3>
                            <h3
                                className={`font-normal text-xs mt-5 ml-6 lg:ml-7 ${
                                    currentView === 'UpcomingPayouts' ? 'text-blue-950' : 'text-gray-500'
                                }`}
                                onClick={() => setCurrentView('UpcomingPayouts')}
                                style={{ cursor: 'pointer' }}
                            >
                                Upcoming payouts
                            </h3>
                        </div>
                        <div>
                            <h3 className="font-medium text-blue-950 text-sm mt-4 ml-6 lg:ml-7">
                                {currentView === 'RevenueYearly' ? 'Revenue' : 'Upcoming Payouts'}
                            </h3>
                            <div className="w-80 h-full lg:min-w-[1005px] lg:h-full pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6">
                                {currentView === 'RevenueYearly' ? (
                                    <RevenueYearly />
                                ) : (
                                    <UpcomingPayouts />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Financial