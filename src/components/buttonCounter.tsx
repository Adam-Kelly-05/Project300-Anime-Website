'use client'; // Needed for interactive components
import { useState } from 'react';
import { Button } from "@/components/ui/button"

export default function ButtonCounter() {
  const [counter, setCounter] = useState(0); // Automaticlly updates the UI on state change

  return (
  <Button
    variant="outline"
    className='bg-neutral-950'
    onClick={() => setCounter(counter + 1)}
  >
    You clicked the counter {counter} times
  </Button>
);

}
