import { useEffect, useState } from "react";
import InputControl from "./InputControl";
import { searchMovies } from "../util/util";
import styled from "styled-components";
import MovieResult from "./MovieResult";

const Search = ({ select }) => {
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

    const clear = () => {
        setSearchResults([]);
        setQuery("")
    }

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
        <Container>
            <InputControl value={query} update={setQuery} clear={clear} />
            <ResultsContainer>
                {searchResults.map(m => <MovieResult select={select} key={m.imdbID} movie={m} />)}
            </ResultsContainer>
        </Container>
        : <button onClick={() => setAdding(true)}>add movies</button>;
}

export default Search;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`
const ResultsContainer = styled.div`
    position: absolute;
    top: 136px;
`