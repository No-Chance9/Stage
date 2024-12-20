import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Totaux({ data }: any) {
  const [totaux, setTotaux] = useState<{
    visitors: number;
    platforms: number;
  }>({
    visitors: 0,
    platforms: 0,
  });

  const [sales, setSales] = useState<{
    totalSales: number;
    totalSalesAmount: number[];
  }>({
    totalSales: 0,
    totalSalesAmount: [],
  });

  useEffect(() => {
    if (data) {
      // Calculer les totaux à partir de la prop data
      const visitors = data.yearlyVisitors.reduce((acc: number, item: any) => acc + item.value, 0);
      const platforms = data.yearlyVisitors.length;

      const totalSales = data.bestSelling.reduce((acc: number, item: any) => acc + item.sold, 0);
      const totalSalesAmount = data.bestSelling.reduce((acc: number, item: any) => acc + item.price * item.sold, 0);

      setTotaux({ visitors, platforms });
      setSales({ totalSales, totalSalesAmount });
    }
  }, [data]);


  return (
    // <div className="flex flex-col gap-4">
    //   <div className="flex lg:flex-row md:flex-col md:items-center gap-2">
    //     {values.map((item, index) => (
    //       <div key={index} className="bg-white shadow-md rounded-lg p-6 w-64">
    //         <h2 className="text-xl font-bold mb-4">
    //           Total visitors
    //         </h2>
    //         <p className="text-3xl font-semibold">{item.value}</p>
    //         <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
    //           <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
    //           {item.percentage}% From the last month
    //         </p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center lg:flex-row md:flex-col md:items-center gap-2">
        <div className="flex flex-row flex-wrap gap-x-6  bg-white shadow-md rounded-lg p-6 w-64 h-36">
          <h2 className="text-xl font-bold mb-4">
            Total visitors
          </h2>
          <Image src={'/images/totalCustomer.svg'} width={50} height={50} alt=""
          />
          <p className="text-3xl font-semibold ">{totaux.visitors}</p>
          {/* <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
              <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
              {item.percentage}% From the last month
            </p> */}
        </div>
        <div className="  bg-white shadow-md rounded-lg p-6 w-64 h-36 ">
          <div className="flex flex-row gap-x-6   ">
            <h2 className="text-xl font-bold mb-4">
              Total e-commerce
            </h2>
            <Image className="" src={'/images/total profit icon.svg'} width={70} height={70} alt=""
            />
          </div>
          <div >
            <p className="text-3xl font-semibold">{totaux.platforms}</p>
            {/* <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
                <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
                {item.percentage}% From the last month
              </p> */}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-64 h-36">
          <div className="flex flex-row gap-x-6 ">
            <h2 className="text-xl font-bold mb-4">
              Total Sales
            </h2>
            <Image className="" src={'/images/total expenses.svg'} width={50} height={50} alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-semibold">{sales.totalSales}pcs pour {sales.totalSalesAmount}$</p>
            {/* <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
                <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
                {item.percentage}% From the last month
              </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
