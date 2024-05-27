import styled from "styled-components";

const MovieResult = ({ movie }) => {
    return (
        <Result>
            <img src={movie.Poster} width="50px" />
            <p style={{ margin: "0px 5px" }}><b>{movie.Title}</b> ({movie.Year})</p>
        </Result>
    )
}

export default MovieResult;

const Result = styled.div`
    display: flex;
    align-items: center;
    margin: .2em 0em;
    background: black;
    border-radius: 5px;
    &:hover {
        background: blue;
    }
`