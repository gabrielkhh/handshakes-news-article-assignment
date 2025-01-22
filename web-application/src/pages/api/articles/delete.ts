import client from "@/lib/mongodb";
import { Article, UpdateArticleResponse } from "@/types";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UpdateArticleResponse>,
) {
    if (req.method === "DELETE") {
        try {
            if (!process.env.DATABASE_NAME || !process.env.DATABASE_COLLECTION) {
                return res.status(500).json({ success: false, message: 'Unable to proceed further due to misconfigured server' });
            }

            const mongoDbClient = await client;
            const db = mongoDbClient.db(process.env.DATABASE_NAME);
            const collection = db.collection(process.env.DATABASE_COLLECTION);

            const { id } = req.query;

            // Validate if ID is provided and is a valid MongoDB ObjectId
            if (!id || !ObjectId.isValid(id as string)) {
                return res.status(400).json({ success: false, message: "Invalid or missing ID" });
            }

            const result = await collection.deleteOne({ _id: new ObjectId(id as string) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ success: false, message: "Article not found for deletion" });
            }

            res.status(200).json({ success: true, message: "Article deleted successfully" });
        } catch (error) {
            console.error("Error deleting article:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
}