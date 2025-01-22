'use client'

import { useParams } from 'next/navigation'
import { useRouter } from 'next/router';
import React from 'react'
import useSWR from 'swr';

const ManageArticle = () => {
    const { isReady } = useRouter();
    const params = useParams()

    const { data: article, isLoading, error } = useSWR(isReady ? `/manage/article/${params?.["id"]}` : null, async (url) => {
        // try {
        //     const articleResponse = await fetch(url);
        //     const articleData = await articleResponse.json();

        //     return articleData;
        // } catch (e) {
        //     console.error("Error fetching article", e);
        //     return null;
        // }
        return true
    })

    React.useEffect(() => {
        console.log("article is", article)
    }, [article])
    
    return (
        <div>{params?.["id"] ?? 'nth'}</div>
    )
}

export default ManageArticle