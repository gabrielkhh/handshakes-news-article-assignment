import client from "@/lib/mongodb";
import { Article, CreateArticleResponse, GetArticlesResponse, NewArticle } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CreateArticleResponse>,
) {
    try {
        const { title, summary, publisher, timestamp } = req.body;
        // Connect to the database
        const mongoDbClient = await client;
        const db = mongoDbClient.db('news');
        const collection = db.collection('articles');
    
        if (req.method === 'POST') {
          if (!title || !summary || !publisher || !timestamp) {
            return res.status(400).json({ success: false, data: req.body });
          }

          const newArticleDocument = {
            title,
            summary,
            timestamp,
            publisher,
          } as NewArticle;
    
          // Insert document into MongoDB
          const result = await collection.insertOne(newArticleDocument);
    
          return res.status(201).json({ success: true, data: newArticleDocument });
        } else {
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`Method ${req.method} Not Allowed`);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, data: {
            title: req.body.title,
            summary: req.body.summary,
            publisher: req.body.publisher,
            timestamp: req.body.timestamp
        } as NewArticle});
      }
}