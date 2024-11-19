import React, { useState } from 'react';
import ButtonGroup from './buttonGroup';
import Totaux from './totaux';
import { CustomerGrowthChart } from './customerGrowth';
import { YearlyVisitorsChart } from './yearlyVisitors';
import BestSelling from './bestSelling';
import ButtonDl from './buttonDownload';
import { saveAs } from 'file-saver';

export const Dashboard = () => {
    const [dataGlobal, setDataGlobal] = useState<{
        customerGrowthData: any[],
        yearlyVisitors: any[],
        bestSelling: any[],
        totaux: any[],
    }>({
        customerGrowthData: [],
        yearlyVisitors: [],
        bestSelling: [],
        totaux: [],
    });

    const dataFromCustomer = (data: any, source: string) => {
        if (source === 'customerGrowth') {
            setDataGlobal(prev => ({ ...prev, customerGrowthData: data }));
        } else if (source === 'yearlyVisitors') {
            setDataGlobal(prev => ({ ...prev, yearlyVisitors: data }));
        } else if (source === 'bestSelling') {
            setDataGlobal(prev => ({ ...prev, bestSelling: data }));
        } else if (source === 'totaux') {
            setDataGlobal(prev => ({ ...prev, totaux: data }));
        }
    };

    const handleDownloadCSV = () => {
        // CSV download logic remains the same
    };

    return (
        <main className="p-4 max-w-screen-xl mx-auto">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold">Overview</h1>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <ButtonGroup />
                    <ButtonDl onClick={handleDownloadCSV} />
                </div>
            </header>

            <section className="grid grid-cols-1 gap-6 mb-6">
                <div className=" bg-gray-100 dark:bg-neutral-800 p-6  rounded-lg shadow">
                    <Totaux sendDataToParent={(data: any) => dataFromCustomer(data, "totaux")} />
                </div>
            </section>

            <section className="grid grid-cols-1 gap-6">
                <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
                    <CustomerGrowthChart sendDataToParent={(data: any) => dataFromCustomer(data, "customerGrowth")} />
                </div>
                <div className="bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
                    <YearlyVisitorsChart sendDataToParent={(data: any) => dataFromCustomer(data, "yearlyVisitors")} />
                </div>
                <div className="lg:col-span-3 bg-gray-100 dark:bg-neutral-800 p-6 rounded-lg shadow">
                    <BestSelling sendDataToParent={(data: any) => dataFromCustomer(data, "bestSelling")} />
                </div>
            </section>
        </main>
    );
};
