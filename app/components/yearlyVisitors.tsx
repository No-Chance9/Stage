"use client";
import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import BestSelling from './bestSelling';
import { CustomerGrowthChart } from './customerGrowth';
import { useEffect, useState } from "react";


// Module 3: Yearly Visitors Pie Chart
export const YearlyVisitorsChart = () => {

    const [chartData, setChartData] = useState<{
                                                labels: string[],
                                                visitors: number[],
                                            }>({
                                                labels: [],
                                                visitors: [],
                                            })

    const fetchValues = async () => {
        try {
            const res = await fetch("/api/yearlies");
            const data = await res.json();

            const labels = data.map((item: any) => item.label);
            const visitors = data.map((item: any) => item.value);

            setChartData({ labels, visitors });
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchValues();
    }, []);
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Visitors',
                data: chartData.visitors,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-4">2023 Visitors This Year</h3>
            <Pie data={data} />
        </div>
    );
};

// Main Component that uses all three modules
// export default function Three() {
//     return (
//         <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
//             {/* <CustomerGrowthChart myProp={undefined} /> */}
//             <YearlyVisitorsChart />
//             <BestSelling />
//         </div>
//     );
// }
