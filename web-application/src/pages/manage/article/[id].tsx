'use client'

import { Article, ArticleFormFields } from '@/types';
import axios from 'axios';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams, useRouter as useNextRouter } from 'next/navigation'
import { useRouter } from 'next/router';
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Datepicker from 'react-tailwindcss-datepicker';
import useSWR from 'swr';
import { ChevronLeft, DeviceFloppy, Trash } from 'tabler-icons-react';

const ManageArticle = () => {
    const { isReady } = useRouter();
    const router = useNextRouter();
    const params = useParams()

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<ArticleFormFields>()

    const articleData = watch();

    const onSubmit: SubmitHandler<ArticleFormFields> = async (data) => {
        try {
            const submissionResponse = await axios.put("/api/articles/update", { _id: params?.["id"], ...data });
            if (submissionResponse.status === 200 && submissionResponse.data.success) {
                toast.success("Article updated successfully!");
            }
        } catch (e) {
            console.error("Error updating article", e);
        }
    }

    const onDelete = async () => {
        try {
            const submissionResponse = await axios.delete(`/api/articles/delete?id=${params?.["id"]}`);
            if (submissionResponse.status === 200 && submissionResponse.data.success) {
                toast.success("Article deleted successfully!");
                router.push("/manage")
            }
        } catch (e) {
            console.error("Error deleting article", e);
        }
    }

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
        if (article) {
            reset({
                title: article.title,
                summary: article.summary,
                publisher: article.publisher,
                timestamp: article.timestamp
            })
        }
    }, [article])

    return (
        <div className="flex flex-col gap-3 min-h-screen">
            <Link href={"/manage"} className="flex text-primary font-semibold items-center gap-1 hover:text-orange-400">
                <ChevronLeft size={20} />
                <span>Manage Articles</span>
            </Link>
            <div className="bg-gray-200 dark:bg-gray-700 text-primary rounded-lg p-3 w-full h-fit flex flex-col gap-3">
                <div className="flex flex-row items-center gap-3">
                    <span className="text-orange-400 font-semibold">{articleData.publisher}</span>
                    {articleData.timestamp && <span className="text-sm font-medium text-gray-400">{dayjs.unix(articleData.timestamp).format('DD MMM YYYY')}</span>}
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold">{articleData.title}</h1>
                    <article>{articleData.summary}</article>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-primary gap-3">
                <div className="flex flex-col bg-gray-200 dark:bg-gray-700 p-3 rounded-lg gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="article-title" className="font-bold text-gray-600 dark:text-gray-400">Article Title</label>
                        <input type="text" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-none" placeholder='Article Title' {...register("title", { required: true })} />
                        {errors.title && <span className="font-semibold text-sm text-red-400">Article title is required</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="article-summary" className="font-bold text-gray-600 dark:text-gray-400">Article Summary</label>
                        <textarea aria-multiline className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-none" placeholder='Insert article summary here' {...register("summary", { required: true })} />
                        {errors.summary && <span className="font-semibold text-sm text-red-400">Article summary is required</span>}
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="flex w-1/2 flex-col gap-1">
                            <label htmlFor="publisher" className="font-bold text-gray-600 dark:text-gray-400">Publisher</label>
                            <input type="text" className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transition-none" placeholder='Saigon Times' {...register("publisher", { required: true })} />
                            {errors.publisher && <span className="font-semibold text-sm text-red-400">Publisher is required</span>}
                        </div>
                        <div className="flex w-1/2 flex-col gap-1">
                            <label htmlFor="timestamp" className="font-bold text-gray-600 dark:text-gray-400">Date/Time</label>
                            <Controller
                                control={control}
                                name={"timestamp"}
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <Datepicker
                                        asSingle
                                        useRange={false}
                                        maxDate={new Date()}
                                        value={{
                                            startDate: new Date(value * 1000),
                                            endDate: new Date(value * 1000),
                                        }}
                                        displayFormat='DD MMM YYYY'
                                        onChange={(e) => onChange(Math.floor(e?.startDate?.getTime()! / 1000))}
                                        inputClassName={"h-12 w-full rounded-lg p-3 dark:bg-gray-800 text-primary transition-none"}
                                    />
                                )}
                            />
                            {errors.timestamp && <span className="font-semibold text-sm text-red-400">Article date is required</span>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <button type="submit" className="flex items-center bg-orange-400 text-white p-3 rounded-lg font-semibold gap-1">
                        <DeviceFloppy size={20} />
                        Update Article
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            onDelete()
                        }}
                        className="flex items-center bg-red-400 text-white p-3 rounded-lg font-semibold gap-1"
                    >
                        <Trash size={20} />
                        Delete Article
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ManageArticle