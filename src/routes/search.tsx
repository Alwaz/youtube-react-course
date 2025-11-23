import useSearchStore from "@/store/searchStore";
import { createFileRoute } from "@tanstack/react-router";
import MovieCard from "../components/MovieCard";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
    };
  },
});

function SearchComponent() {
  const results = useSearchStore((state) => state.results);

  return (
    <div className="container mx-auto px-4">
      {results.length > 0 ? (
        <div className="mt-8 p-8 grid grid-cols-fluid gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        "No results found"
      )}
    </div>
  );
}
