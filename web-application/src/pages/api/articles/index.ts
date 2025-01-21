import { Article } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Article[]>,
) {
    // TODO
    res.status(200).json([
        {
            title: "Article 1",
            summary: "Summary 1",
            date: Date.now(),
            publisher: "Publisher 1",
        },
        {
            title: "Article 2",
            summary: "Summary 2",
            date: Date.now(),
            publisher: "Publisher 2",
        },
    ]);
}
