import styled from "styled-components";
import MovieDetails from "./MovieDetails";

const MovieTable = ({ movies }) => {
    return (
        <Table>
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