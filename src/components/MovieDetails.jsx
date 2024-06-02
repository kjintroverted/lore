import styled from "styled-components";
import { Spacer } from "./styled";

const MovieDetails = ({ movie }) => {

    // Ratings
    // 0: {Source: 'Internet Movie Database', Value: '7.8/10'}
    // 1: {Source: 'Rotten Tomatoes', Value: '75%'}
    // 2: {Source: 'Metacritic', Value: '51/100'}

    return (
        <TabelRow>
            <BigText>{movie.Title} ({movie.Year})</BigText>
            <Spacer />
            <LittleText>{movie.Ratings[0].Value}</LittleText>
        </TabelRow>
    )
}

export default MovieDetails;

const TabelRow = styled.div`
    display: flex;
    border-bottom: gray solid;
    padding: .3em;
`

const BigText = styled.h3`
    margin: .1em;
`

const LittleText = styled.p`
    margin: .1em;
`
