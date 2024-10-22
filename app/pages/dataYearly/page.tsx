import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import Yearly from '../../../models/Yearly'

interface DataItem {
    label: string;
    type: string;
    value: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();

    const data: DataItem[] = [
        {
            label: "Amazon",
            type: "Visitors",
            value: 2100,
        },
        {
            label: "Alibaba",
            type: "Visitors",
            value: 1000,
        },
        {
            label: "Ebay",
            type: "Visitors",
            value: 1900,
        },
        {
            label: "Shopify",
            type: "Visitors",
            value: 15100,
        },
    ];

    try {
        await Yearly.insertMany(data);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
}
