import useBaseMovieStore from "@/store/moviesStore";
import useSearchStore from "@/store/searchStore";
import { useState } from "react";
import performSearch from "./performSearch";

export function useSearchMovies() {
  const [shouldShowSearch, setShouldShowSearch] = useState(false);

  const baseMovies = useBaseMovieStore((state) => state.baseMovies);
  const setResults = useSearchStore((state) => state.setResults);

  const searchQuery = (query: string) => {
    const matchingTitles = performSearch(query, baseMovies);
    console.log("Matching Titles:", matchingTitles.data);
    setResults(matchingTitles.data);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;

    searchQuery(query);
  };
  return {
    shouldShowSearch,
    setShouldShowSearch,

    handleSearchQueryChange,
  };
}
