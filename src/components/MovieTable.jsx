import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import { Spacer } from "./styled";
import Search from "./Search";
import { useEffect, useState } from "react";
import { SOURCES, sortRating } from "../util/util";

const MovieTable = ({ movies, addMovie, saveMovie }) => {

    const [sortedMovies, setSortedMovies] = useState(movies);
    const [sortOptions, setSortOptions] = useState({ factor: 1, source: SOURCES.custom });

    useEffect(() => {
        let reSortList = [...movies].sort(sortRating(sortOptions.factor, sortOptions.source));
        setSortedMovies(reSortList);
    }, [movies, sortOptions]);

    function updateTags(i) {
        return async (tagArr) => {
            let updated = sortedMovies[i]
            updated.tags = tagArr;
            saveMovie(updated)
            setSortedMovies(
                [...sortedMovies.slice(0, i),
                    updated,
                ...sortedMovies.slice(i + 1)
                ]
            )
        }
    }

    function updateRating(i) {
        return (category) => {
            return (value) => {
                let updated = sortedMovies[i]
                if (!updated.rating) updated.rating = {}
                updated.rating[category] = +value;
                setSortedMovies(
                    [...sortedMovies.slice(0, i),
                        updated,
                    ...sortedMovies.slice(i + 1)
                    ]
                )
            }
        }
    }

    function updateSort(source) {
        if (source === sortOptions.source) {
            setSortOptions({ factor: sortOptions.factor * -1, source })
        } else {
            setSortOptions({ ...sortOptions, source })
        }
    }

    return (
        <Table>
            <Header>
                <Spacer />
                <Search select={addMovie} />
            </Header>
            <TabelRow>
                <SingleCol />
                <LittleText style={{ flex: 1 }}>Title</LittleText>
                <DoubleCol onClick={() => updateSort(SOURCES.custom)}>
                    <LittleText>Rating</LittleText>
                </DoubleCol>
                {
                    window.innerWidth > 700 &&
                    <>
                        <SingleCol onClick={() => updateSort(SOURCES.imdb)}>
                            <LittleText>IMDB</LittleText>
                        </SingleCol>
                        <SingleCol onClick={() => updateSort(SOURCES.tom)}>
                            <LittleText>RT</LittleText>
                        </SingleCol>
                    </>
                }
            </TabelRow>
            {
                sortedMovies.map((m, i) =>
                    <MovieDetails
                        key={m.id}
                        movie={m}
                        rank={i + 1}
                        updateTags={updateTags(i)}
                        updateRating={updateRating(i)}
                        saveMovie={saveMovie}
                        sort={sortOptions.source}
                    />)
            }
        </Table>
    )
}

export default MovieTable;

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-width: 1080px;
`
const Header = styled.div`
    display: flex;
    border-bottom: gray solid;
    padding: .3em;
`

const TabelRow = styled.div`
    display: flex;
    border-bottom: gray solid;
    padding: 0em .3em;
    > * {
        border-left: gray solid;
        padding: .2em;
        &:nth-child(1) {
            border: none;
        }
    }
`

const SingleCol = styled.div`
    width: 3.5em;
    text-align: center;
    cursor: pointer;
`

const DoubleCol = styled.div`
    width: 5em;
    text-align: center;
    cursor: pointer;
`

const LittleText = styled.p`
    margin: .0em;
    font-size: .8em;
`