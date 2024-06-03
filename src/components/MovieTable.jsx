import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import { Spacer } from "./styled";
import Search from "./Search";
import { useEffect, useState } from "react";

const MovieTable = ({ movies, saveMovie }) => {

    const [sortedMovies, setSortedMovies] = useState(movies);

    useEffect(() => {
        setSortedMovies(movies.sort((a, b) => {
            const imdbA = +a.info.Ratings
                .find(r => r.Source = 'Internet Movie Database')
                .Value.split('/')[0];
            const imdbB = +b.info.Ratings
                .find(r => r.Source = 'Internet Movie Database')
                .Value.split('/')[0];
            return imdbB - imdbA;
        }));
    }, [movies]);

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
                <Search select={saveMovie} />
            </Header>
            <TabelRow>
                <SingleCol />
                <LittleText style={{ flex: 1 }}>Title</LittleText>
                <DoubleCol>
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
                sortedMovies.map((m, i) => <MovieDetails key={m.id} movie={m} rank={i + 1} updateRating={updateRating(i)} />)
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
`

const LittleText = styled.p`
    margin: .0em;
    font-size: .8em
`