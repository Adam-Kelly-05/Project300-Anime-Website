// src/app/anime/[id]/AnimeDetailsPage.tsx
import { AnimeDetails } from "@/types/Anime";

interface Props {
  anime: AnimeDetails & {
    cover: string;
    japaneseTitle?: string;
    airedDate?: string;
    trailerURL?: string;
  };
}

export default function AnimeDetailsPage({ anime }: Props) {
  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Cover Image */}
      <div className="w-full h-96 relative mb-6">
        <img
          src={anime.cover}
          alt={anime.title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Titles */}
      <div className="mb-4">
        <h1 className="text-4xl font-bold">{anime.title}</h1>
        {anime.japaneseTitle && (
          <h2 className="text-xl text-gray-500">{anime.japaneseTitle}</h2>
        )}
      </div>

      {/* Aired Date & Trailer */}
      <div className="flex items-center space-x-4 mb-6">
        {anime.airedDate && (
          <p className="text-gray-600">Aired: {anime.airedDate}</p>
        )}
        {anime.trailerURL && (
          <a
            href={anime.trailerURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Watch Trailer
          </a>
        )}
      </div>

      {/* Description */}
      <p className="mb-8 text-gray-700">{anime.description}</p>

      {/* Characters */}
      <h3 className="text-2xl font-semibold mb-4">Characters</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {anime.characters.map((char) => (
          <div key={char.id} className="text-center">
            <div className="border-2 border-blue-500 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <p className="mt-2 font-medium">{char.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
