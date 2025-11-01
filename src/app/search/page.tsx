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
                <Card key={item.animeId} className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <CardContent className="p-0">
                    <Link href={`/anime/${item.animeId}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={item.cover}
                          alt={item.englishTitle}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                          {item.englishTitle}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-2">
                          {item.japaneseTitle}
                        </p>
                        
                        <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                          {item.background}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-sm">
                            {new Date(item.airedDate).getFullYear()}
                          </span>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 p-1"
                          >
                            View Details →
                          </Button>
                        </div>
                      </div>
                    </Link>
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