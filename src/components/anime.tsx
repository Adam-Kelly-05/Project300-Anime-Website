'use client'

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
//import { Anime} from "@/types/anime"

export default function AnimesObject() {
    const [animes, setAnime] = React.useState<Anime[]>([]);

    React.useEffect(() => {
        async function fetchAnime() {
            const response = await fetch("https://p7gfovbtqg.execute-api.eu-west-1.amazonaws.com/prod/reviews");
            const reviews = await response.json();
            setAnime(animes);
        }
        fetchAnime();
    }, []);
    return ( // returns all reviews
        <div className="space-y-4 p-4">
            {
            animes.map((anime) => (
                <Card key={anime.animeId} className="bg-white text-black rounded-xl">
                    <CardHeader>
                        <CardTitle>{anime.animeName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{anime.animeHeader}</CardDescription>
                        <CardDescription>{anime.animeBody}</CardDescription>
                        <CardDescription>Rating: {anime.rating}/10</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
