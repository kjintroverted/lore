import { Row, Spacer } from "./styled";

const MovieDetails = ({ movie }) => {
    return (
        <Row>
            <img width={50} src={movie.Poster} />
            <h2>{movie.Title} ({movie.Year})</h2>
            <Spacer />
            <h2>{movie.Ratings[0].Value}</h2>
        </Row>
    )
}

export default MovieDetails;