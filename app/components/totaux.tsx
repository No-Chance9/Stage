import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Totaux({sendDataToParent}:any) {
    const [values, setValues] = useState<any[]>([]);

    const fetchValues = async () => {
        try {
            const res = await fetch("/api/overviews");
            const data = await res.json();
            setValues(data);

            sendDataToParent(data)
        } catch (error) {
            console.error("Error fetching overviews:", error);
        }
    };

    useEffect(() => {
        fetchValues();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {/* <button 
                // onClick={exportToCSV} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg self-start mb-4"
            >
                Download CSV
            </button> */}
            <div className="flex flex-row gap-2">
                {values.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 w-64">
                        <h2 className="text-xl font-bold mb-4">
                            <Image src="/images/decreasing.svg" alt="treg" width={50} height={50} /> {item.title}
                        </h2>
                        <p className="text-3xl font-semibold">{item.value}</p>
                        <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2`}>
                            {item.percentage}% From the last month
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
