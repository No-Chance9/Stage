"use client";
import React from 'react';
import ButtonGroup from './buttonGroup';
import Totaux from './totaux';
import { CustomerGrowthChart } from './customerGrowth';
import { YearlyVisitorsChart } from './yearlyVisitors';
import { BestSellingProducts } from './bestSelling';
import ButtonDl from './buttonDownload';

export const Dashboard = () => {
    return (
        <div className="flex flex-wrap   ">
            <div className="grid grid-cols-10 ">
                <h1 className="font-bold p-4 ">Totaux</h1>
                <div className=" col-start-7 p-4 col-end-9">
                    <ButtonGroup />
                </div>
                <div className=" justify-self-end col-start-9 p-4 col-end-11 ">
                    <ButtonDl />
                </div>
                {/* </ */}
            </div>
            <div className="rounded-tl-2xl dark:border-neutral-700 bg-gray dark:bg-neutral-900 flex flex-col gap-2  h-max">
                <div className="flex gap-2 w-max flex-1 p-4">
                    {/* {[...new Array(4)].map((i) => ( */}
                    <div
                        key={"first-array"}
                        className="h-max w-full rounded-lg bg-gray-100 dark:bg-neutral-800 "
                    >
                        <Totaux />
                    </div>
                    {/* ))} */}
                </div>
                <div className="grid grid-col-4 grid-row-2 w-full gap-6 p-4 flex-1 overflow-hidden">
                {/* {[...new Array(2)].map((i) => ( */}
                <div
                        key={"second-array"}
                        className=" rounded-lg col-start-1 col-end-3  bg-gray-100 dark:bg-neutral-800 "
                    ><CustomerGrowthChart />
                    </div>
                    <div
                        key={"second-array"}
                        className=" rounded-lg col-start-3 col-end-4  bg-gray-100 dark:bg-neutral-800 flex-1 "
                    ><YearlyVisitorsChart />
                    </div>
                    <div
                        key={"second-array"}
                        className=" rounded-lg row-start-2 col-start-1 col-end-4 bg-gray-100 dark:bg-neutral-800 flex-1 "
                    ><BestSellingProducts />
                    </div> 
                {/* ))} */}
                </div>
            </div>
        </div>

    );

}