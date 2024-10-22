import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import Overview from '../../../models/Overview';

interface DataItem {
  title: string;
  value: string;
  percentage: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  const data: DataItem[] = [
    {
      title: "Total Customers",
      value: "21.978",
      percentage: 15,
    },
    {
      title: "Active Customers",
      value: "10.432",
      percentage: -43,
    },
    {
      title: "Total Profit",
      value: "$32.978,32",
      percentage: 59,
    },
    {
      title: "Total Expense",
      value: "$23.978,42",
      percentage: -13,
    },
  ];

  try {
    await Overview.insertMany(data);
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    res.status(400).json({ error });
  }
}
