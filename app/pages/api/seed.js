import connectMongo from '../../../lib/mongodb';
import Overview from '../../../models/Overview';

export default async function handler(req, res) {
  await connectMongo();

  const data = [
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
