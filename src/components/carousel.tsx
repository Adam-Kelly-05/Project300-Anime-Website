import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import anime from "../extras/anime.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export default function CarouselObject() {
    return (
        <div>
            <Carousel>
                <CarouselContent>
                    {anime.map((item) => ( // for every item in the anime.json file
                        <CarouselItem key={item.animeId} className="flex-none w-[240px]">
                            <Card>
                                <CardContent>
                                    <img src={item.cover} alt={item.englishTitle} className="w-full aspect-[2/3] border-3 border-black"/>
                                    <h3 className="font-bold">{item.englishTitle}</h3>
                                    <p className="text-sm text-gray-950">{item.japaneseTitle}</p>
                                    <p className="text-sm text-gray-950">{item.airedDate}</p>
                                    <p className="text-sm text-gray-950">{item.background}</p>
                                    <a className="text-sm text-gray-950" href={item.trailerURL}>Trailer</a>
                                    <a className="text-sm text-gray-950" href={item.cover}>More Info</a>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}