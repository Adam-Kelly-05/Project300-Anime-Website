import * as React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

interface Character {
  id: number
  name: string
  image: string
}

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Card className="w-40 flex flex-col items-center">
      <img
        src={character.image}
        alt={character.name}
        className="w-32 h-32 rounded-full object-cover mt-2"
      />
      <CardContent className="text-center">
        <CardTitle>{character.name}</CardTitle>
      </CardContent>
    </Card>
  )
}

