import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../lib/mongodb';
import BestSelling from '../../../models/BestSelling';

interface DataItem {
    name: string;
    price: string;
    sold: string;
    status: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectMongo();

    const data: DataItem[] = [
        {
            name: 'Sneaker',
            price: '$400',
            sold: '0 pcs',
            status: 'Out of Stock',
        },
        {
            name: 'Socks',
            price: '$185',
            sold: '12 pcs',
            status: 'In Stock',
        },
        {
            name: 'Shirts',
            price: '$150',
            sold: '36 pcs',
            status: 'Low quantity',
        },
        {
            name: 'Hats', 
            price: '$132',
            sold: '19 pcs',
            status: 'Low quantity',
        },
    ];

    try {
        await BestSelling.insertMany(data);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
}
