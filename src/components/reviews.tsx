import * as React from "react"
import anime from "../extras/anime.json"
import reviews from "../extras/reviews.json"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export default function ReviewsObject() {
    return ( // returns all reviews
        <div className="space-y-4 p-4">
            {anime.map((animeItem) => {
                const animesReviews = reviews.filter((review) => review.animeId === animeItem.animeId)
                return ( // returns each review
                    <div key={animeItem.animeId} className="space-y-4">
                        {animesReviews.map((review) => (
                            <Card key={review.reviewId} className="bg-white text-black rounded-xl">
                                <CardHeader>
                                    <CardTitle>{animeItem.englishTitle}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{review.reviewText}</CardDescription>
                                    <CardDescription>Rating: {review.score}/10</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
