import connectToDatabase from '@/lib/mongodb';
import DataModel from '@/models/Data';

export default async function handler(req, res) {
    await connectToDatabase();

    if (req.method === 'GET') {
        const data = await DataModel.find({});
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        const newData = await DataModel.create(req.body);
        res.status(201).json(newData);
    } else {
        res.status(405).end();
    }
}
