import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import { Spacer } from "./styled";
import Search from "./Search";
import { useEffect, useState } from "react";
import { sortRating } from "../util/util";

const MovieTable = ({ movies, addMovie, saveMovie }) => {

    const [sortedMovies, setSortedMovies] = useState(movies);
    const [sortFactor, setSortFactor] = useState(1);

    useEffect(() => {
        setSortedMovies(movies.sort(sortRating(sortFactor)));
    }, [movies, sortFactor]);

    function updateRating(i) {
        return (category) => {
            return (value) => {
                let updated = movies[i]
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

    return (
        <Table>
            <Header>
                <Spacer />
                <Search select={addMovie} />
            </Header>
            <TabelRow>
                <SingleCol />
                <LittleText style={{ flex: 1 }}>Title</LittleText>
                <DoubleCol onClick={() => setSortFactor(sortFactor * -1)}>
                    <LittleText>Rating</LittleText>
                </DoubleCol>
                <SingleCol>
                    <LittleText>IMDB</LittleText>
                </SingleCol>
                <SingleCol>
                    <LittleText>Meta</LittleText>
                </SingleCol>
            </TabelRow>
            {
                sortedMovies.map((m, i) => <MovieDetails
                    key={m.id}
                    movie={m}
                    rank={i + 1}
                    updateRating={updateRating(i)}
                    saveMovie={saveMovie} />)
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