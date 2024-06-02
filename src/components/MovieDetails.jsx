import styled from "styled-components";

const MovieDetails = ({ movie }) => {

    // Ratings
    // 0: {Source: 'Internet Movie Database', Value: '7.8/10'}
    // 1: {Source: 'Rotten Tomatoes', Value: '75%'}
    // 2: {Source: 'Metacritic', Value: '51/100'}

    return (
        <TabelRow>
            <SingleCol />
            <BigText style={{ flex: 1 }}>{movie.Title} ({movie.Year})</BigText>
            <DoubleCol>
                <BigText className="glow">9.0</BigText>
            </DoubleCol>
            <SingleCol>
                <LittleText>{movie.Ratings[0].Value}</LittleText>
            </SingleCol>
            <SingleCol>
                <LittleText>{movie.Ratings[1].Value}</LittleText>
            </SingleCol>
        </TabelRow>
    )
}

export default MovieDetails;

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

const BigText = styled.h3`
    margin: 0em;
    &.glow {
        text-shadow: white 0px 0px 10px;
    }
`

const LittleText = styled.p`
    margin: .1em;
`
