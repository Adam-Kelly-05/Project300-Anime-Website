import { Suspense } from "react"
import SearchPage from "./SearchPage"  // <-- the file you showed earlier

export default function Search() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400 pt-20">Loading search...</div>}>
      <SearchPage />
    </Suspense>
  )
}
