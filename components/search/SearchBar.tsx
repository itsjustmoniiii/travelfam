import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSearchResults from "@/hooks/useSearchResults";
import SearchItem from "./SearchItem";
import { ClipLoader } from "react-spinners";

const SearchBar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchResults, mutate: mutateSearchResults } =
    useSearchResults(searchQuery);

  useEffect(() => {
    const searchUsers = async () => {
      try {
        setIsLoading(true);
        await axios.get(`/api/search?q=${searchQuery}`);
        mutateSearchResults();
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    if (searchQuery !== "") {
      searchUsers();
    }
  }, [searchQuery, mutateSearchResults]);

  return (
    <>
      <div className="flex items-center gap-2 p-4 bg-neutral-800 rounded-lg mb-3 w-full">
        <input
          type="text"
          placeholder="Search for users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded h-15 w-full bg-[#1313136f] text-white"
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )}
      {searchResults?.length === 0 && (
        <div className="flex mb-3 justify-between text-white items-center p-3 bg-[#2c2c2cae] rounded-lg">
          <p>No results</p>
        </div>
      )}
      {searchResults?.length > 0 &&
        searchResults.map((result: Record<string, any>) => (
          <div key={result.id}>
            <SearchItem data={result} />
          </div>
        ))}
    </>
  );
};

export default SearchBar;
