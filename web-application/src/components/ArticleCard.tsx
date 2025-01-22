import { Article } from '@/types';
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
                <span className="text-sm text-gray-700 dark:text-gray-400">{article.timestamp}</span>
            </div>
            <h1 className="font-semibold text-2xl text-primary">{article.title}</h1>
            <article className="text-gray-700 dark:text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </article>
        </div>
    )
}

export default ArticleCard