import { Article, GetArticlesResponse } from '@/types'
import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { Pencil } from 'tabler-icons-react'
import Link from 'next/link'

const ManageArticles = () => {
    const { data: articles, isLoading, error } = useSWR<Article[]>("articles/manage", async () => {
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
        <div className="flex flex-col gap-3 h-screen">
            <div className="flex justify-between">
                <h2 className="font-semibold text-2xl text-primary">Manage Articles</h2>
                <Link href={"/manage/create"} className="flex items-center gap-1 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg hover text-primary font-semibold">
                    <Pencil size={18} />
                    <span>Create Article</span>
                </Link>
            </div>
            <div className="">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b dark:border-gray-800 sm:rounded-lg dark:bg-gray-800">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr className="">
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            >
                                                Article ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            >
                                                Article Title
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            >
                                                Article Preview
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            >
                                                Publisher
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                            >
                                                Timestamp
                                            </th>
                                            <th scope="col" className="relative px-6 py-3 max-w-max">
                                                <span className="sr-only">View more</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="transition-colors duration-500 bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {articles?.map((article, index) => (
                                            <tr key={article._id}>
                                                <td className="transition-colors duration-500 px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                                    #{article._id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="transition-colors duration-500 text-sm text-gray-700 max-w-lg truncate dark:text-gray-200">
                                                        {article.title}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="transition-colors duration-500 text-sm text-gray-700 max-w-lg truncate dark:text-gray-200">
                                                        {article.summary}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <p className="transition-colors duration-500 text-sm text-gray-700 max-w-lg truncate dark:text-gray-200">
                                                        {article.publisher}
                                                    </p>
                                                </td>
                                                <td className="transition-colors duration-500 px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                                                    {dayjs(article.timestamp * 1000).format(
                                                        "D MMM YYYY, h:mm:ss A"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        className="font-semibold transition-colors duration-500 text-orange-400 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-400 focus:outline-none"
                                                        onClick={() => { }}
                                                    >
                                                        View more
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ManageArticles