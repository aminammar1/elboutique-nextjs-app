import Rating from '@mui/material/Rating'
import Image from 'next/image'
import React from 'react'
import { getDate } from '@/lib/utils'

export default function ReviewItem({ item }) {
    return (
    <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
        <Image
            width="40"
            height="40"
            className="mr-2 w-auto h-auto rounded-full"
            src={item?.reviewBy?.imageUrl || '/assets/images/w1.jpg'}
            alt="image"
        />
        <div className="flex flex-col gap-1 items-center [&span]:text-2xl">
            <h6>{item.reviewBy?.fullName}</h6>
            <Rating
            size="small"
            name="size-small"
            readOnly
            value={item.rating}
            precision={0.5}
            style={{ color: 'orange', fontSize: '10px' }}
            />
        </div>
        </div>
        <p>{item.review}</p>
        <div className="flex items-center gap-4">
        <em className="text-gray-400">Review by </em> <strong>{item.reviewBy?.fullName}</strong>
        Posted on <em className="text-gray-400">{getDate(item.createdAt)}</em>
        </div>
    </div>
    )
}
