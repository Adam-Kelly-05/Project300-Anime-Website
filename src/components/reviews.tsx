'use client'

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Review } from "@/types/reviews"

export default function ReviewsObject() {
    const [reviews, setReviews] = React.useState<Review[]>([]);

    React.useEffect(() => {
        async function fetchReviews() {
            const response = await fetch("https://p7gfovbtqg.execute-api.eu-west-1.amazonaws.com/prod/reviews");
            const reviews = await response.json();
            setReviews(reviews);
        }
        fetchReviews();
    }, []);
    return ( // returns all reviews
        <div className="space-y-4 p-4">
            {
            reviews.map((review) => (
                <Card key={review.reviewId} className="bg-white text-black rounded-xl">
                    <CardHeader>
                        <CardTitle>{review.animeName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{review.reviewHeader}</CardDescription>
                        <CardDescription>{review.reviewBody}</CardDescription>
                        <CardDescription>Rating: {review.rating}/10</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
