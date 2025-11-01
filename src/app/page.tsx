"use client"

import CarouselObject from "@/components/carousel";
import anime from "@/extras/anime.json";

export default function Home() {
  // Get trending anime (first 10 for now)
  const trendingAnime = anime.slice(0, 10);
  
  // Group anime by genres (simplified genre classification based on content)
  const genreGroups = {
    Action: anime.filter(item => 
      item.englishTitle.toLowerCase().includes('attack') ||
      item.englishTitle.toLowerCase().includes('demon') ||
      item.englishTitle.toLowerCase().includes('hero') ||
      item.englishTitle.toLowerCase().includes('hunter')
    ).slice(0, 8),
    Adventure: anime.filter(item => 
      item.englishTitle.toLowerCase().includes('piece') ||
      item.englishTitle.toLowerCase().includes('adventure') ||
      item.englishTitle.toLowerCase().includes('journey')
    ).slice(0, 8),
    Drama: anime.filter(item => 
      item.englishTitle.toLowerCase().includes('fullmetal') ||
      item.englishTitle.toLowerCase().includes('silent') ||
      item.englishTitle.toLowerCase().includes('your name')
    ).slice(0, 8),
    Fantasy: anime.filter(item => 
      item.englishTitle.toLowerCase().includes('slayer') ||
      item.englishTitle.toLowerCase().includes('mage') ||
      item.englishTitle.toLowerCase().includes('witch')
    ).slice(0, 8),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="blue-gradient py-16 border-b-4 border-blue-400" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #1d4ed8 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="https://placehold.co/150x150/3b82f6/ffffff?text=LOGO" 
              alt="Anirank Logo" 
              className="mx-auto w-24 h-24 md:w-32 md:h-32"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Anirank
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 font-medium">
            Discover, rate, and review your favorite anime series
          </p>
        </div>
      </section>

      {/* Trending Anime Section */}
      <section className="py-12 bg-blue-950" style={{backgroundColor: '#172554'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-blue-500 rounded-full mr-4" style={{backgroundColor: '#3b82f6'}}></div>
            <h2 className="text-3xl font-bold text-white">Trending Anime</h2>
          </div>
          <CarouselObject />
        </div>
      </section>

      {/* Genre Sections */}
      {Object.entries(genreGroups).map(([genre, animeList], index) => (
        <section key={genre} className={`py-8 border-t-2`} style={{
          backgroundColor: index % 2 === 0 ? '#0a0e1a' : '#172554',
          borderColor: '#3b82f6'
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <div className="h-6 w-1 bg-blue-400 rounded-full mr-3" style={{backgroundColor: '#60a5fa'}}></div>
              <h3 className="text-2xl font-bold text-white">{genre}</h3>
              <div className="flex-1 ml-4 h-px" style={{background: 'linear-gradient(to right, rgba(59, 130, 246, 0.6), transparent)'}}></div>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {animeList.map((item) => (
                  <div key={item.animeId} className="flex-none w-48">
                    <div className="rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105" style={{
                      backgroundColor: '#1a1f3a',
                      border: '2px solid #3b82f6',
                      boxShadow: '0 1px 3px rgba(59, 130, 246, 0.1)'
                    }} 
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#60a5fa';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(59, 130, 246, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(59, 130, 246, 0.1)';
                    }}>
                      <img 
                        src={item.cover} 
                        alt={item.englishTitle} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-3" style={{backgroundColor: '#1a1f3a'}}>
                        <h4 className="font-semibold text-sm text-white mb-1 truncate">
                          {item.englishTitle}
                        </h4>
                        <p className="text-xs font-medium truncate" style={{color: '#60a5fa'}}>
                          {item.airedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
