import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { BestSellingProducts } from './bestSelling';
import { CustomerGrowthChart } from './customerGrowth';

// Module 3: Yearly Visitors Pie Chart
export const YearlyVisitorsChart = () => {
    const data = {
        labels: ['Amazon', 'Alibaba', 'Ebay', 'Shopify'],
        datasets: [
            {
                label: 'Visitors',
                data: [2100, 1000, 1900, 15100],
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
export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <BestSellingProducts />
            <CustomerGrowthChart />
            <YearlyVisitorsChart />
        </div>
    );
}
