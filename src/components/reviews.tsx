import * as React from "react"
import anime from "../extras/anime.json"
import reviews from "../extras/reviews.json"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function ReviewsObject() {
    return ( // returns all reviews
        <div className="space-y-4 p-4">
            {reviews.map((review) => (
                <Card key={review.reviewId} className="bg-white text-black rounded-xl">
                    <CardHeader>
                        <CardTitle>{review.animeId}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{review.reviewText}</CardDescription>
                        <CardDescription>Rating: {review.score}/10</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
