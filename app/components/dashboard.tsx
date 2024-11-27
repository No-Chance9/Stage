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
            setDataGlobal(prev => ({ ...prev, customerGrowthData: data }))
        } else if (source === 'yearlyVisitors') {
            setDataGlobal(prev => ({ ...prev, yearlyVisitors: data }))
            console.log(dataGlobal);
        } else if (source === 'bestSelling') {
            setDataGlobal(prev => ({ ...prev, bestSelling: data }))
            console.log(dataGlobal);
        }
        else if (source === 'totaux') {
            setDataGlobal(prev => ({ ...prev, totaux: data }))
            console.log(dataGlobal);
        }
    };

    // Les noms de champs en excluant les champs superflus
    const keys = dataGlobal.customerGrowthData[0] ?
        Object.keys(dataGlobal.customerGrowthData[0]).filter(key => !["_id", "__v"].includes(key)).map(key => key.toUpperCase())
        : [];
    console.log("Field names:", keys);

    const keys2 = dataGlobal.yearlyVisitors[0] ?
        Object.keys(dataGlobal.yearlyVisitors[0]).filter(key => !["_id", "__v"].includes(key)).map(key => key.toUpperCase())
        : [];

    const keys3 = dataGlobal.bestSelling[0] ?
        Object.keys(dataGlobal.bestSelling[0]).filter(key => !["_id", "__v", "statusColor"].includes(key)).map(key => key.toUpperCase())
        : [];

    const keys4 = dataGlobal.totaux[0] ?
        Object.keys(dataGlobal.totaux[0]).filter(key => !["_id", "__v"].includes(key)).map(key => key.toUpperCase())
        : [];

    const handleDownloadCSV = () => {
        const csvRows1 = [
            keys,
            ...dataGlobal.customerGrowthData.map((item: any) => [item.month, item.menCustomer, item.womenCustomer, item.newCustomer]),
        ];

        const csvRows2 = [
            keys2,
            ...dataGlobal.yearlyVisitors.map((item: any) => [item.label, item.type, item.value]),
        ];

        const csvRows3 = [
            keys3,
            ...dataGlobal.bestSelling.map((item: any) => [item.name, item.price, item.stock, item.sold, item.status]),
        ];

        const csvRows4 = [
            keys4,
            ...dataGlobal.totaux.map((item: any) => [item.title, item.value, item.percentage]),
        ];

        const csvContent1 = csvRows1.map(e => e.join(",")).join("\n");
        const csvContent2 = csvRows2.map(e => e.join(",")).join("\n");
        const csvContent3 = csvRows3.map(e => e.join(",")).join("\n");
        const csvContent4 = csvRows4.map(e => e.join(",")).join("\n");

        const combinedCsvContent = `${csvContent1}\n\n${csvContent2}\n\n${csvContent3}\n\n${csvContent4}`;

        const blob = new Blob([combinedCsvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'combined_customer_data.csv')
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
                <div className=" bg-gray-100 dark:bg-neutral-800 p-6 md:items-center rounded-lg shadow">
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