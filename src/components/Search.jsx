import { useEffect, useState } from "react";
import InputControl from "./InputControl";
import { searchMovies } from "../util";
import { Column } from "./styled";

const Search = ({ }) => {
    const SEARCH_DELAY = 1000;

    const [adding, setAdding] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        // CANCEL EXISTING TIMER
        if (timer) clearTimeout(timer)
        // CREATE NEW TIMER
        setTimer(setTimeout(search, SEARCH_DELAY))
    }, [query])

    const search = () => {
        setTimer(null)
        if (!query) {
            setSearchResults([]);
            return
        }
        // GET NEW RESULTS
        searchMovies(query)
            .then(setSearchResults)
    }

    return adding ?
        <Column>
            <InputControl value={query} update={setQuery} />
            {searchResults.map(m => <p key={m.imdbID}>{m.Title} ({m.Year})</p>)}
        </Column>
        : <button onClick={() => setAdding(true)}>add movies</button>;
}

export default Search;