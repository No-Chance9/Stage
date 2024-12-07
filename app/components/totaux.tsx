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


  const fetchValues = async () => {
    try {
      const resDashboard = await fetch(`/api/dashboards/${data._id}`);
      const dataDashboard = await resDashboard.json();

      // Calculer le total des visiteurs
      const visitors = dataDashboard.yearlyVisitors.reduce((acc: number, item: any) => acc + item.value, 0);

      //Nbre de plateforme de vente
      const platforms = dataDashboard.yearlyVisitors.length;

      setTotaux({ visitors, platforms });

      // sendDataToParent(data)
    } catch (error) {
      console.error("Error fetching yearlies:", error);
    }
  };

  useEffect(() => {
    fetchValues();
  }, [data]);

  const [sales, setSales] = useState<{
    totalSales: number;
    totalSalesAmount: number[];
  }>({
    totalSales: 0,
    totalSalesAmount: [],
  });

  const fetchSales = async () => {
    try {
      const resSale = await fetch(`/api/dashboards/${data._id}`);
      const dataSales = await resSale.json();

      // Calculer le total des ventes
      const totalSales = dataSales.bestSelling.reduce((acc: number, item: any) => acc + item.sold, 0);

      // Calculer le total du chiffre d affaire
      const totalSalesAmount = dataSales.bestSelling.reduce((acc: number, amount: any) => acc + amount.price * amount.sold, 0);

      setSales({ totalSales, totalSalesAmount });

    } catch (error) {
      console.error("Error fetching bests:", error);
    }
  }

  useEffect(() => {
    fetchSales();
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
      <div className="flex lg:flex-row md:flex-col md:items-center gap-2">
        <div className="bg-white shadow-md rounded-lg p-6 w-64">
          <h2 className="text-xl font-bold mb-4">
            Total visitors
          </h2>
          <p className="text-3xl font-semibold">{totaux.visitors}</p>
          {/* <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
              <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
              {item.percentage}% From the last month
            </p> */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-64">
          <h2 className="text-xl font-bold mb-4">
            Total e-commerce
          </h2>
          <p className="text-3xl font-semibold">{totaux.platforms}</p>
          {/* <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
              <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
              {item.percentage}% From the last month
            </p> */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-64">
          <h2 className="text-xl font-bold mb-4">
            Total Sales
          </h2>
          <p className="text-3xl font-semibold">{sales.totalSales}pcs pour {sales.totalSalesAmount}$</p>
          {/* <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2 flex`}>
              <Image className="me-1" src={`${item.percentage < 0 ? "/images/decreasing.svg" : '/images/Group 44.svg'}`} alt="treg" width={20} height={20} />
              {item.percentage}% From the last month
            </p> */}
        </div>
      </div>
    </div>
  );
}
