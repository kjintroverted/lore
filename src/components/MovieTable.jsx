import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import { Spacer } from "./styled";
import Search from "./Search";
import { useEffect, useState } from "react";

const MovieTable = ({ movies }) => {

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

    async function saveMovie(movie) {
        let { dataset } = await initThing(
            movie,
            movieShape,
            {
                id: movie.id,
                dataset: movieDataset,
                fetch: appData.fetch
            });
        setMovieDataset(dataset);
    }

    return (
        <Table>
            <Header>
                <Spacer />
                <Search select={saveMovie} />
            </Header>
            <Header>

            </Header>
            {
                sortedMovies.map(m => <MovieDetails key={m.id} movie={m.info} />)
            }
        </Table>
    )
}

export default MovieTable;

const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-wdith: 540px;
`
const Header = styled.div`
    display: flex;
    border-bottom: gray solid;
    padding: .3em;
`