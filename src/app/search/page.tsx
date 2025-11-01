"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import anime from '@/extras/anime.json'
import SearchBar from '@/components/searchBar'

interface AnimeItem {
  animeId: number
  englishTitle: string
  japaneseTitle: string
  cover: string
  airedDate: string
  background: string
  trailerURL: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filteredAnime, setFilteredAnime] = useState<AnimeItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    if (!query.trim()) {
      setFilteredAnime([])
      setIsLoading(false)
      return
    }

    // Filter anime based on search query
    const searchTerm = query.toLowerCase().trim()
    const results = anime.filter((item: AnimeItem) => 
      item.englishTitle.toLowerCase().includes(searchTerm) ||
      item.japaneseTitle.toLowerCase().includes(searchTerm) ||
      item.background.toLowerCase().includes(searchTerm)
    )

    setFilteredAnime(results)
    setIsLoading(false)
  }, [query])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Search Anime
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Find your favorite anime series and movies
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar placeholder="Search by title or description..." />
          </div>
        </div>

        {/* Search Results */}
        <div className="mb-8">
          {query && (
            <p className="text-gray-300 mb-6">
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  Showing {filteredAnime.length} result{filteredAnime.length !== 1 ? 's' : ''} for "{query}"
                </>
              )}
            </p>
          )}

          {!query && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                Enter a search term to find anime
              </div>
              <div className="text-gray-500">
                Search by title, Japanese title, or description
              </div>
            </div>
          )}

          {query && !isLoading && filteredAnime.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                No anime found matching "{query}"
              </div>
              <div className="text-gray-500">
                Try searching with different keywords
              </div>
            </div>
          )}

          {/* Results Grid */}
          {filteredAnime.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAnime.map((item: AnimeItem) => (
                <Card key={item.animeId} className="overflow-hidden transition-all duration-300 hover:scale-105 bg-card border-primary/20 shadow-lg hover:shadow-2xl hover:border-primary/40">
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}