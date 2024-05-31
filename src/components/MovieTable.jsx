import MovieDetails from "./MovieDetails";

const MovieTable = ({ movies }) => {
    return (
        <>
            {
                movies.map(m => <MovieDetails key={m.id} movie={m.info} />)
            }
        </>
    )
}

export default MovieTable;