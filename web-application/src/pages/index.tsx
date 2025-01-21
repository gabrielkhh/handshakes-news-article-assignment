import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types";
import axios from "axios";
import { Geist, Geist_Mono } from "next/font/google";
import useSWR from "swr";
import { Loader2 } from "tabler-icons-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { data: articles, isLoading, error } = useSWR<Article[]>("articles", async () => {
    try {
      const articlesResponse = await axios.get<Article[]>("/api/articles");

      if (articlesResponse.status === 200) {
        return articlesResponse.data;
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error fetching articles", e);
      return [];
    }

  })
  return (
    <div className={`flex flex-col gap-3 h-screen`}>
      <h2 className="font-semibold text-2xl text-primary">View All Articles</h2>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="flex flex-row h-40 w-full items-center justify-around text-center rounded-lg p-3">
            <div className="flex flex-row items-center gap-1 text-gray-600 dark:text-gray-400">
              <span className="text-sm ">Loading articles...</span>
              <Loader2 size={18} className="animate-spin" />
            </div>
          </div>
        ) : (
          articles?.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))
        )}
      </div>
    </div>
  );
}
