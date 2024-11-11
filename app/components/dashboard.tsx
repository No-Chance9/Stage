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
        if (source === 'customerGrowth'){
            setDataGlobal(prev => ({ ...prev, customerGrowthData: data }))
        }else if (source === 'yearlyVisitors'){
            setDataGlobal(prev => ({ ...prev, yearlyVisitors: data }))
            console.log(dataGlobal);
        }else if (source === 'bestSelling'){
            setDataGlobal(prev => ({ ...prev, bestSelling: data }))
            console.log(dataGlobal);
        }
        else if (source === 'totaux'){
            setDataGlobal(prev => ({ ...prev, totaux: data }))
            console.log(dataGlobal);
        }
    };

    // Les noms de champs en excluant les champs superflus
    const keys = dataGlobal.customerGrowthData[0]? 
        Object.keys(dataGlobal.customerGrowthData[0] ).filter(key => !["_id", "__v"].includes(key)).map(key => key.toUpperCase())
        : [];
    console.log("Field names:", keys);

    const keys2 = dataGlobal.yearlyVisitors[0]? 
        Object.keys(dataGlobal.yearlyVisitors[0] ).filter(key => !["_id", "__v"].includes(key)).map(key => key.toUpperCase())
        : [];

    const keys3 = dataGlobal.bestSelling[0]?     
        Object.keys(dataGlobal.bestSelling[0] ).filter(key => !["_id", "__v","statusColor"].includes(key)).map(key => key.toUpperCase())
        : [];

    const keys4 = dataGlobal.totaux[0]? 
        Object.keys(dataGlobal.totaux[0] ).filter(key => !["_id", "__v"].includes(key)).map(key => key.toUpperCase())
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
            ...dataGlobal.bestSelling.map((item: any) => [item.name, item.price, item.sold, item.status]),
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
        <div className="flex flex-wrap   ">
            <div className="grid grid-cols-10 ">
                <h1 className="font-bold p-4 ">Overview</h1>
                <div className=" col-start-7 p-4 col-end-9">
                    <ButtonGroup />
                </div>
                <div className=" justify-self-end col-start-9 p-4 col-end-11 ">
                    <ButtonDl onClick={handleDownloadCSV} />
                </div>
                {/* </ */}
            </div>
            <div className="rounded-tl-2xl dark:border-neutral-700 bg-gray dark:bg-neutral-900 flex flex-col gap-2 w-max h-max">
                <div className="flex gap-2 w-max flex-1 p-4">
                    {/* {[...new Array(4)].map((i) => ( */}
                    <div
                        key={"first-array"}
                        className="h-max w-full rounded-lg bg-gray-100 dark:bg-neutral-800 "
                    >
                        <Totaux sendDataToParent={(data: any) => dataFromCustomer(data,"totaux" )} />
                    </div>
                    {/* ))} */}
                </div>
                <div className="grid grid-col-4 grid-row-2 w-full gap-6 p-4 flex-1 overflow-hidden">
                    {/* {[...new Array(2)].map((i) => ( */}
                    <div
                        key={"second-array"}
                        className=" rounded-lg col-start-1 col-end-3  bg-gray-100 dark:bg-neutral-800 "
                    ><CustomerGrowthChart sendDataToParent={(data: any) => dataFromCustomer(data,"customerGrowth" )} />
                    </div>
                    <div
                        key={"second-array"}
                        className=" rounded-lg col-start-3 col-end-4  bg-gray-100 dark:bg-neutral-800 flex-1 "
                    ><YearlyVisitorsChart sendDataToParent={(data: any) => dataFromCustomer(data,"yearlyVisitors" )} />
                    </div>
                    <div
                        key={"second-array"}
                        className=" rounded-lg row-start-2 col-start-1 col-end-4 bg-gray-100 dark:bg-neutral-800 flex-1 "
                    ><BestSelling sendDataToParent={(data: any) => dataFromCustomer(data,"bestSelling" )}/>
                    </div>
                    {/* ))} */}
                </div>
            </div>
        </div>

    );

}