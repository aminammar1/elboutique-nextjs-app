'use client'
import React , {useState} from 'react'
import Reviews from './Reviews'
import AddReview from './AddReview'



export default function Review ({product}) {
    const [reviews, setReviews] = useState(product.reviews)

    return (
        <div className="flex flex-col gap-4">
            <AddReview product={product} reviews={reviews} setReviews={setReviews} />
            <Reviews reviews={reviews} product={product} />
        </div>
    )
}




