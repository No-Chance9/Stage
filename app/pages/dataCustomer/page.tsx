import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import Customer from '../../../models/Customer';

interface DataItem {
    month: string;
    menCustomer: number;
    womenCustomer: number;
    newCustomer: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();

    const data: DataItem[] = [
        {
            month: "January",
            menCustomer: 15000,
            womenCustomer: 12000,
            newCustomer: 23000,
        },
        {
            month: "February",
            menCustomer: 10000,
            womenCustomer: 9000,
            newCustomer: 6543,
        },
        {
            month: "March",
            menCustomer: 12000,
            womenCustomer: 11000,
            newCustomer: 34467,
        },
        {
            month: "April",
            menCustomer: 27000,
            womenCustomer: 32000,
            newCustomer: 32000,
        },
        {
            month: "May",
            menCustomer: 15000,
            womenCustomer: 18000,
            newCustomer: 15454
        },
        {
            month: "June",
            menCustomer: 30000,
            womenCustomer: 25000,
            newCustomer: 25000,
        },
        {
            month: "July",
            menCustomer: 14000,
            womenCustomer: 16000,
            newCustomer: 16000,
        },
        {
            month: "August",
            menCustomer: 9000,
            womenCustomer: 12000,
            newCustomer: 12000,
        },
    ];

    try {
        await Customer.insertMany(data);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
}
