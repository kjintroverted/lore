import { Row, Spacer } from "./styled";

const MovieDetails = ({ movie }) => {
    return (
        <Row>
            <img width={50} src={movie.Poster} />
            <h3>{movie.Title} ({movie.Year})</h3>
            <Spacer />
            <h3>{movie.Ratings[0].Value}</h3>
        </Row>
    )
}

export default MovieDetails;