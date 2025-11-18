"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import anime from "../extras/anime.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Anime } from "@/types/animes"

//----------------------
interface AnimeItem {
  animeId: number
  englishTitle: string
  japaneseTitle: string
  cover: string
  airedDate: string
  background: string
  trailerURL: string
}
//------------------------

export default function AnimeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
  }, [])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  const scrollTo = React.useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        className="w-full max-w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {anime.map((item) => (
            <CarouselItem key={item.animeId} className="pl-2 md:pl-4 basis-auto">
              <AnimeCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={cn(
          "left-4 bg-primary border-primary/50 hover:bg-primary/90 text-primary-foreground",
          "shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        )} />
        <CarouselNext className={cn(
          "right-4 bg-primary border-primary/50 hover:bg-primary/90 text-primary-foreground", 
          "shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        )} />
      </Carousel>
      
      <CarouselIndicators 
        count={count} 
        current={current} 
        onSelect={scrollTo} 
      />
    </div>
  )
}

//------------------------
interface AnimeCardProps {
  item: Anime
}
//------------------------
function AnimeCard({ item }: AnimeCardProps) {
  return (
    <div className="w-[280px]">
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:scale-105",
        "bg-card border-primary/20 shadow-lg hover:shadow-2xl hover:border-primary/40"
      )}>
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={item.cover}
              alt={item.englishTitle}
              className="w-full h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent" />
            <div className="absolute top-2 right-2">
              <div className="px-2 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                #{item.animeId}
              </div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <Link href={`/anime/${item.animeId}`}>
              <h3 className="font-bold text-lg text-foreground leading-tight line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                {item.englishTitle}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground font-medium line-clamp-1">
              {item.japaneseTitle}
            </p>
            <p className="text-sm text-muted-foreground">
              Aired: {item.airedDate}
            </p>
            <p className="text-sm text-card-foreground/80 line-clamp-3">
              {item.background}
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full mt-3 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
            >
              <a
                href={item.trailerURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
              >
                Watch Trailer
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1" />
                </svg>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
//----------------------------------
interface CarouselIndicatorsProps {
  count: number
  current: number
  onSelect: (index: number) => void
}
//----------------------------------
function CarouselIndicators({ count, current, onSelect }: CarouselIndicatorsProps) {
  if (count <= 1) return null
  
  return (
    <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Carousel navigation">
      {Array.from({ length: count }, (_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          onClick={() => onSelect(index)}
          className={cn(
            "w-3 h-3 rounded-full p-0 transition-all duration-300",
            "hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary",
            current === index + 1 && "scale-125"
          )}
          style={{
            backgroundColor: current === index + 1 ? '#3b82f6' : '#1a1f3a',
            borderColor: current === index + 1 ? '#3b82f6' : '#60a5fa',
            boxShadow: current === index + 1 ? '0 0 15px rgba(59, 130, 246, 0.6)' : 'none'
          }}
          aria-label={`Go to slide ${index + 1}`}
          role="tab"
          aria-selected={current === index + 1}
        />
      ))}
    </div>
  )
}