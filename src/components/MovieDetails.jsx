import styled from "styled-components";
import { overallScore } from "../util/util";
import { Column, Row } from "./styled";
import { useState } from "react";

const MovieDetails = ({ movie, rank }) => {

    // Ratings
    // 0: {Source: 'Internet Movie Database', Value: '7.8/10'}
    // 1: {Source: 'Rotten Tomatoes', Value: '75%'}
    // 2: {Source: 'Metacritic', Value: '51/100'}

    const [open, setOpen] = useState(false);

    return (
        <Column>
            <TabelRow onClick={() => setOpen(!open)}>
                <SingleCol>
                    {rank}
                </SingleCol>
                <BigText style={{ flex: 1 }}>{movie.info.Title} ({movie.info.Year})</BigText>
                <DoubleCol>
                    <BigText className="glow">{overallScore(movie.rating) || "-"}</BigText>
                </DoubleCol>
                <SingleCol>
                    <LittleText>{movie.info.Ratings[0].Value}</LittleText>
                </SingleCol>
                <SingleCol>
                    <LittleText>{movie.info.Ratings[1].Value}</LittleText>
                </SingleCol>
            </TabelRow>
            {
                movie.info &&
                <Details className={open ? "open" : ""}>
                    <img src={movie.info.Poster} width={100} />
                </Details>
            }
        </Column>
    )
}

export default MovieDetails;

const TabelRow = styled.div`
    display: flex;
    border-bottom: gray solid;
    padding: 0em .3em;
    cursor: pointer;
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

const Details = styled.div`
    display: flex;
    align-items: center;
    transition: height .3s ease-in-out;
    height: 0px;
    overflow: hidden;
    &.open{
        border-bottom: gray solid;
        height: 200px;
    }
`
