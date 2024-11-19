import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Totaux({ sendDataToParent }: any) {
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
      <div className="flex lg:flex-row md:flex-col md:items-center gap-2">
        {values.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 w-64">
            <h2 className="text-xl font-bold mb-4">
              {item.title}
            </h2>
            <p className="text-3xl font-semibold">{item.value}</p>
            <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
              <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
              {item.percentage}% From the last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
