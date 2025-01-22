import { Article } from '@/types';
import dayjs from 'dayjs';
import React from 'react'

const ArticleCard = ({
    article
}: {
    article: Article;
}) => {
    return (
        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
            <div className="flex flex-row gap-2">
                <h3 className="font-bold text-sm text-accent">{article.publisher}</h3>
                <span className="text-sm text-gray-700 dark:text-gray-400">{dayjs.unix(article.timestamp).format("DD MMM YYYY")}</span>
            </div>
            <h1 className="font-semibold text-2xl text-primary">{article.title}</h1>
            <article className="text-gray-700 dark:text-gray-400">
                {article.summary}
            </article>
        </div>
    )
}

export default ArticleCard