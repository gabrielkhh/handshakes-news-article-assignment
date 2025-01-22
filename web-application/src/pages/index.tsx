import ArticleCard from "@/components/ArticleCard";
import { Article, GetArticlesResponse } from "@/types";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import { Loader2 } from "tabler-icons-react";

export default function Home() {
  const { data: articles, isLoading, error } = useSWR<Article[]>("articles", async () => {
    try {
      const articlesResponse = await axios.get<GetArticlesResponse>("/api/articles");

      if (articlesResponse.status === 200) {
        return articlesResponse.data.data;
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error fetching articles", e);
      return [];
    }
  })

  return (
    <div className={`flex flex-col gap-3 min-h-screen`}>
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
          <>
            {articles?.length === 0 && (
              <div className="flex flex-row h-40 w-full items-center justify-around text-center rounded-lg p-3">
                <span className="text-gray-600 dark:text-gray-400">No articles found</span>
              </div>
            )}
            <div className="flex flex-col gap-3 overflow-y-scroll">
              {articles?.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
