import client from "@/lib/mongodb";
import { Article, GetSingleArticleResponse } from "@/types";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetSingleArticleResponse>,
) {
    if (req.method === 'GET') {
        try {
            if (!process.env.DATABASE_NAME || !process.env.DATABASE_COLLECTION) {
                return res.status(500).json({ success: false, message: 'Unable to proceed further due to misconfigured server' });
            }

            const { id } = req.query;

            // Validate the ID format
            if (!id || !ObjectId.isValid(id as string)) {
                return res.status(400).json({ success: false, message: 'Invalid ID format' });
            }

            const mongoDbClient = await client;
            const db = mongoDbClient.db(process.env.DATABASE_NAME);
            const collection = db.collection(process.env.DATABASE_COLLECTION);

            // Find the document by _id
            const document = await collection.findOne({ _id: new ObjectId(id as string) });

            if (!document) {
                return res.status(404).json({ success: false, message: 'Article not found' });
            }

            res.status(200).json({ success: true, data: document as unknown as Article });
        } catch (error) {
            console.error('Error fetching document:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
}
