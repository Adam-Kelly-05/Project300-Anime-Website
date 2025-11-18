export interface Character {
  id: number;
  name: string;
  image: string;
}

export interface AnimeDetails {
  id: number;
  title: string;
  description: string;
  characters: Character[];
}
