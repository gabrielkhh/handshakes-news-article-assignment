import client from "@/lib/mongodb";
import { Article, UpdateArticleResponse } from "@/types";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UpdateArticleResponse>,
) {
    if (req.method === "PUT") {
        try {
            const mongoDbClient = await client;
            const db = mongoDbClient.db("news");
            const collection = db.collection("articles");

            const { _id, ...updateFields } = req.body;

            // Validate ID
            if (!_id || !ObjectId.isValid(_id)) {
                return res.status(400).json({ success: false, message: "Invalid or missing ID" });
            }

            // Perform the update operation
            const result = await collection.updateOne(
                { _id: ObjectId.createFromHexString(_id) },
                { $set: updateFields }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({ success: false, message: "Document not found" });
            }

            res.status(200).json({ success: true, message: "Document updated successfully" });
        } catch (error) {
            console.error("Error updating document:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
}