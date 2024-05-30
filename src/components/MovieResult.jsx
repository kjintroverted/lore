import styled from "styled-components";
import { Column } from "./styled";

const MovieResult = ({ movie, select }) => {
    return (
        <Result>
            <img src={movie.Poster} width="50px" />
            <p style={{ margin: "0px 5px", flex: 1 }}><b>{movie.Title}</b> ({movie.Year})</p>
            <Column>
                <button onClick={() => select({ id: movie.imdbID })}>+</button>
                {/* <button>bookmark</button> */}
            </Column>
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