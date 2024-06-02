import styled from "styled-components";
import MovieDetails from "./MovieDetails";
import { Spacer } from "./styled";
import Search from "./Search";

const MovieTable = ({ movies }) => {

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
            {
                movies.map(m => <MovieDetails key={m.id} movie={m.info} />)
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
`