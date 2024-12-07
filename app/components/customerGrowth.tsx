'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from "react";

// Module 2: Customer Growth Bar Chart
export const CustomerGrowthChart = ( {sendDataToParent}:any ) => {

    const [chartData, setChartData] = useState<{
        months: string[],
        menCustomer: number[],
        womenCustomer: number[],
        newCustomer: number[]
    }>({
        months: [],
        menCustomer: [],
        womenCustomer: [],
        newCustomer: []
    });

    const fetchValues = async () => {
        try {
            const res = await fetch("/api/customers");
            const data = await res.json();

            // Extract the values from the fetched data
            const months = data.map((item: any) => item.month);
            const menCustomer = data.map((item: any) => item.menCustomer);
            const womenCustomer = data.map((item: any) => item.womenCustomer);
            const newCustomer = data.map((item: any) => item.newCustomer);

            // Update chart data
            setChartData({ months, menCustomer, womenCustomer, newCustomer });

            // Pass data to parent component
            sendDataToParent(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchValues();
    }, []);


    const data = {
        labels: chartData.months,
        datasets: [
            {
                label: 'Men Customer',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                data: chartData.menCustomer,
            },
            {
                label: 'Women Customer',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: chartData.womenCustomer,
            },
            {
                label: 'New Customer',
                backgroundColor: 'rgba(199, 23, 655, 0.6)',
                borderColor: 'rgba(199, 63, 655, 1)',
                borderWidth: 1,
                data: chartData.newCustomer,
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
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
            <h3 className="text-xl font-semibold mb-4">Customer Growth</h3>
            <Bar data={data} options={options} />
        </div>
    );
};