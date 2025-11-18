import AnimeDetailsPage from "./AnimeDetailsPage";
import { AnimeDetails } from "@/types/Anime";
import animeData from "@/extras/anime.json";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return animeData.map((anime) => ({
    id: anime.animeId.toString(),
  }));
}

export default function Page({ params }: Props) {
  const id = Number(params.id);

  // Find anime by animeId
  const rawAnime = animeData.find((a) => a.animeId === id);

  if (!rawAnime) {
    return <p>Anime not found</p>;
  }

  // Map JSON to AnimeDetails type + extra fields for AnimeDetailsPage
  const anime: AnimeDetails & {
    cover: string;
    japaneseTitle?: string;
    airedDate?: string;
    trailerURL?: string;
  } = {
    id: rawAnime.animeId,
    title: rawAnime.englishTitle,
    description: rawAnime.background,
    characters: rawAnime.characters.map((c, index) => ({
      id: Number(index), // generates a numeric ID for TypeScript
      name: c.name,
      image: c.image,
    })),
    cover: rawAnime.cover,
    japaneseTitle: rawAnime.japaneseTitle,
    airedDate: rawAnime.airedDate,
    trailerURL: rawAnime.trailerURL,
  };

  return <AnimeDetailsPage anime={anime} />;
}
