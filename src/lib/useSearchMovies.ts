import useBaseMovieStore from "@/store/moviesStore";
import useSearchStore from "@/store/searchStore";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import performSearch from "./performSearch";

export function useSearchMovies() {
  const [shouldShowSearch, setShouldShowSearch] = useState(false);
  const searchParams = useSearch({
    strict: false,
    select: (search) => (search as { movie?: string })?.movie || "",
  });

  const navigate = useNavigate();

  const baseMovies = useBaseMovieStore((state) => state.baseMovies);
  const setResults = useSearchStore((state) => state.setResults);

  const searchQuery = (query: string) => {
    const matchingTitles = performSearch(query, baseMovies);
    setResults(matchingTitles.data);
  };

  const navigateToSearch = (query: string) => {
    if (query.trim() === "") {
      navigate({ to: "/" });
    } else {
      navigate({ to: "/search", search: { movie: query } });
    }
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;
    searchQuery(query);
    navigateToSearch(query);
  };
  return {
    shouldShowSearch,
    setShouldShowSearch,
    handleSearchQueryChange,
    searchParams,
  };
}
