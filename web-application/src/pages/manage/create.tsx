'use client'
import { ArticleFormFields } from '@/types'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import toast from 'react-hot-toast';
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

const CreateArticle = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ArticleFormFields>()

  const onSubmit: SubmitHandler<ArticleFormFields> = async (data) => {
    console.log(data)
    try {
      const submissionResponse = await axios.post("/api/articles/create", data);
      if (submissionResponse.status === 201 && submissionResponse.data.success) {
        toast.success("Article created successfully!");
      }
    } catch (e) {
      console.error("Error creating article", e);
    }
  }

  return (
    <div className="flex flex-col gap-5 h-screen">
      <h2 className="font-semibold text-2xl text-primary">Create New Article</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-primary">
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
        <button className="p-3 mt-5 text-white font-semibold rounded-lg bg-orange-400 hover:bg-orange-300">Create Article</button>
      </form>
    </div>
  )
}

export default CreateArticle