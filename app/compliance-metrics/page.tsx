'use client'
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import CompliantRate from '@/components/ClientComplianceRate';
import AuditReadiness from '@/components/AuditReadiness';
import ComplianceTraining from '@/components/ComplianceTraining';
import Violation from '@/components/Violation';

const compliance = () => {
    return (
        <div className='bg-gray-100'>
            <div className='pr-10'>
                <Sidebar />
            </div>
            <div className='pb-10'>
                <Header />
            </div>
            <div className='max-w-6xl h-screen bg-white mt-8 lg:mt-14 md:ml-64 lg:ml-64 2xl:w-max-w-7xl rounded'>
                <div>
                    <div className='flex flex-col lg:flex-row'>
                        <div className='w-80 lg:w-80 h-full pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6 pb-56 lg:pb-0'>
                            <CompliantRate />
                        </div>
                        <div className='w-80 lg:w-80 h-full pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6 pb-56 lg:pb-0'>
                            <AuditReadiness />
                        </div>
                        <div className='w-80 lg:w-80 h-full pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6 pb-56 lg:pb-0'>
                            <ComplianceTraining />
                        </div>
                    </div>

                    <div>
                        <h3 className='font-normal text-blue-950 text-sm pt-6 ml-8 lg:pt-8 lg:ml-7'>HOS violation reduction</h3>
                    </div>
                    <div className='w-80 lg:max-w-5xl h-full ml-7 mt-6 bg-white rounded-md shadow'>
                        <Violation />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default compliance