'use client'
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/header';
import RevenueComp from '@/components/RevenueComp';
import ProgressBar from '@/components/NetPromoter';
import NonRenewing from '@/components/NonRenewingClient';

const engagement = () => {

    // const [feedbackData, setFeedbackData] = useState([]);
    // const [loading, setLoading] = useState(true);

    const data = [
        { label: 'Satisfied', value: 80, max: 100 },
        { label: 'Neutral', value: 50, max: 100 },
        { label: 'Unsatisfied', value: 20, max: 100 },
    ];

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await fetch('http://localhost:3000/api/feedback');
    //         const { data } = await res.json();
    //         setFeedbackData(data);
    //       } catch (error) {
    //         console.error('Error fetching feedback data:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };

    //     fetchData();
    //   }, []);

    //   if (loading) {
    //     return (
    //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    //         <p>Loading...</p>
    //       </div>
    //     );
    //   }

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
                        <h3 className='font-normal text-blue-950 text-sm mt-5 ml-6 lg:ml-7'>Revenue</h3>
                        <div className='w-80 lg:min-w-[490px] h-72 pl-0 bg-white shadow rounded-md ml-6 lg:ml-7 mt-6'>
                            <RevenueComp />
                        </div>
                    </div>
                    <div>
                        <h3 className='font-normal text-blue-950 text-sm pt-6 ml-8 lg:pt-5 lg:ml-0'>Net promoter score (NPS)</h3>
                        <div className='w-80 lg:min-w-[490px] h-72 ml-6 lg:ml-0 mt-6 bg-white rounded-md shadow'>
                            <div className="w-full max-w-md">
                                {data.map((item, index) => (
                                    <ProgressBar
                                        key={index}
                                        label={item.label}
                                        value={item.value}
                                        max={item.max}
                                    />
                                ))}
                                {/* {feedbackData.map((item, index) => (
                                    <ProgressBar
                                        key={index}
                                        label={item.label}
                                        value={item.value}
                                        max={item.max}
                                    />
                                ))} */}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <h3 className='font-normal text-blue-950 text-sm mt-10 ml-6 lg:ml-7'>Churn rate (Top non-renewing clients with insights)</h3>
                        <div className='w-80 lg:min-w-[1020px] h-80 ml-7 mt-6 bg-white rounded-md shadow'>
                            <NonRenewing />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default engagement