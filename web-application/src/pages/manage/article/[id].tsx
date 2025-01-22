'use client'

import { Article } from '@/types';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';

const ManageArticle = () => {
    const { isReady } = useRouter();
    const params = useParams()

    const { data: article, isLoading, error } = useSWR<Article | null>(isReady ? `/manage/article/${params?.["id"]}` : null, async () => {
        try {
            const articleResponse = await axios.get(`/api/articles/getArticle?id=${params?.["id"]}`)

            if (articleResponse.status === 200) {
                return articleResponse.data.data
            } else {
                return null
            }
        } catch (e) {
            console.error("Error fetching article", e)
            return null
        }
    })

    React.useEffect(() => {
        console.log("article is", article)
    }, [article])

    return (
        <div className="flex min-h-screen">
            <div className="bg-gray-200 rounded-lg p-3">TODO</div>
        </div>
    )
}

export default ManageArticle