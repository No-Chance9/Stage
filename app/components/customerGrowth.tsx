import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Module 2: Customer Growth Bar Chart
export const CustomerGrowthChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Men Customer',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: [15000, 10000, 12000, 27000, 15000, 30000, 14000, 9000],
            },
            {
                label: 'Women Customer',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: [12000, 9000, 11000, 32000, 18000, 25000, 16000, 12000],
            },
            {
                label: 'New Customer',
                backgroundColor: 'rgba(45, 63, 655, 0.6)',
                borderColor: 'rgba(45, 63, 655, 1)',
                borderWidth: 1,
                data: [23000, 6543, 34467, 32000, 15454, 25000, 16000, 12000],
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 50000,
            },
        },
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-4">Customer Growth</h3>
            <Bar data={data} options={options} />
        </div>
    );
};