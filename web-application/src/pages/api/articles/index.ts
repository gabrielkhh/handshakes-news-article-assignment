import client from "@/lib/mongodb";
import { Article, GetArticlesResponse } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetArticlesResponse>,
) {
    try {
        if (!process.env.DATABASE_NAME || !process.env.DATABASE_COLLECTION) {
            return res.status(500).json({ success: false, data: [], message: 'Unable to proceed further due to misconfigured server' });
        }

        // Connect to the database
        const mongoDbClient = await client;
        const db = mongoDbClient.db(process.env.DATABASE_NAME);
    
        if (req.method === 'GET') {
          // Fetch data from a collection
          const items = await db.collection(process.env.DATABASE_COLLECTION).find({}).toArray();
    
          res.status(200).json({ success: true, data: items.map((item) => item as unknown as Article) });
        } else {
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: [] });
      }
}
