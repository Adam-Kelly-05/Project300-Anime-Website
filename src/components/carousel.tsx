"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import anime from "../extras/anime.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function CarouselObject() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const scrollTo = (index: number) => {
        api?.scrollTo(index)
    }

    // Calculate how many items are visible at once (approximation based on container width and item width)
    const itemsPerPage = Math.floor(1200 / 300) // Assuming container ~1200px, items ~300px
    const totalPages = Math.ceil(anime.length / itemsPerPage)

    return (
        <div className="w-full">
            <div className="relative">
                <Carousel 
                    className="w-full" 
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {anime.map((item) => ( // for every item in the anime.json file
                            <CarouselItem key={item.animeId} className="pl-2 md:pl-4 basis-auto">
                                <div className="w-[280px]">
                                    <Card className="bg-card shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 blue-border-glow" style={{backgroundColor: '#1a1f3a', borderColor: '#3b82f6'}}>
                                        <CardContent className="p-0">
                                            <div className="relative">
                                                <img 
                                                    src={item.cover} 
                                                    alt={item.englishTitle} 
                                                    className="w-full h-[380px] object-cover rounded-t-lg"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-blue-600/20 to-transparent rounded-t-lg" style={{background: 'linear-gradient(to top, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.2) 10%, transparent 100%)'}} />
                                                <div className="absolute top-2 right-2">
                                                    <div className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{backgroundColor: '#3b82f6'}}>
                                                        #{item.animeId}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-2 bg-gradient-to-b from-card to-card/95">
                                                <h3 className="font-bold text-lg text-foreground leading-tight">
                                                    {item.englishTitle}
                                                </h3>
                                                <p className="text-sm text-accent font-medium">
                                                    {item.japaneseTitle}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Aired: {item.airedDate}
                                                </p>
                                                <p className="text-sm text-card-foreground/90 line-clamp-3">
                                                    {item.background}
                                                </p>
                                                <a 
                                                    className="inline-flex items-center text-sm text-primary hover:text-accent font-bold transition-colors border border-primary/30 hover:border-accent/50 px-3 py-1 rounded-full hover:bg-primary/10" 
                                                    href={item.trailerURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Watch Trailer 
                                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    {/* Navigation Arrows */}
                    <CarouselPrevious className="left-4 bg-blue-600 border-blue-500 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all" style={{backgroundColor: '#3b82f6', borderColor: '#2563eb'}} />
                    <CarouselNext className="right-4 bg-blue-600 border-blue-500 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all" style={{backgroundColor: '#3b82f6', borderColor: '#2563eb'}} />
                </Carousel>

                {/* Pagination Bullets */}
                <div className="flex justify-center mt-6 space-x-3">
                    {Array.from({ length: count }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                                current === index + 1
                                    ? "scale-125"
                                    : "hover:scale-110"
                            }`}
                            style={{
                                backgroundColor: current === index + 1 ? '#3b82f6' : '#1a1f3a',
                                borderColor: current === index + 1 ? '#3b82f6' : '#60a5fa',
                                boxShadow: current === index + 1 ? '0 0 15px rgba(59, 130, 246, 0.6)' : 'none'
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}