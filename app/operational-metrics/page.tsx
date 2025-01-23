'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import SupportTicket from '@/components/SupportTicket';
import TimeToOnboard from '@/components/TimeToOnboard';
import TrainingCompletion from '@/components/TrainingCompletion';

const operational = () => {

    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl h-screen bg-white mt-8 lg:mt-14 md:ml-64 lg:ml-64 2xl:w-max-w-7xl rounded'>
                <div className='flex flex-col lg:flex-row gap-6'>
                    <div>
                        <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-7'>Support ticket resolution</h3>
                        <div className='w-80 lg:min-w-[490px] h-72 pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6'>
                            <SupportTicket />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-normal text-blue-950 text-sm pt-6 ml-8 lg:pt-5 lg:ml-0'>Time to Onboard</h3>
                        <div className='w-80 lg:min-w-[490px] h-72 ml-6 lg:ml-0 mt-6 bg-white rounded-md shadow'>
                            <div className="w-full max-w-md">
                                <TimeToOnboard />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className='font-normal text-blue-950 text-sm mt-10 ml-6 lg:ml-7'>Training Completion Time</h3>
                    <div className='w-80 lg:min-w-[1010px] h-72 ml-7 mt-6 bg-white rounded-md shadow'>
                        <TrainingCompletion />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default operational