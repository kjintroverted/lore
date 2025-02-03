import styled from "styled-components";
import { SOURCES, overallScore } from "../util/util";
import { Column, Row } from "./styled";
import { useState } from "react";
import RateSlider from "./RateSlider";
import Tags from "./Tags";

const MovieDetails = ({ movie, rank, updateTags, updateRating, saveMovie, sort, filter }) => {

    const [open, setOpen] = useState(false);

    return (
        <Column>
            <TabelRow onClick={() => setOpen(!open)}>
                <SingleCol>
                    {rank}
                </SingleCol>
                <Column style={{ flex: 1 }}>
                    <BigText >{movie.info.Title} ({movie.info.Year})</BigText>
                    <Tags tags={movie.tags || []} updateTags={updateTags} tagClick={filter} />
                </Column>
                <DoubleCol>
                    <BigText className={sort === SOURCES.custom ? "glow" : ""}>
                        {overallScore(movie.rating) || "-"}
                    </BigText>
                </DoubleCol>
                {
                    window.innerWidth > 700 &&
                    <>
                        <SingleCol>
                            <LittleText className={sort === SOURCES.imdb ? "glow" : ""}>
                                {movie.info.Ratings.find(r => r.Source === SOURCES.imdb).Value}
                            </LittleText>
                        </SingleCol>
                        <SingleCol>
                            <LittleText className={sort === SOURCES.tom ? "glow" : ""}>
                                {movie.info.Ratings.find(r => r.Source === SOURCES.tom) ? movie.info.Ratings.find(r => r.Source === SOURCES.tom).Value : '-'}
                            </LittleText>
                        </SingleCol>
                    </>
                }
            </TabelRow>
            {
                movie.info &&
                <Details className={open ? "open" : ""}>
                    <Column style={{ width: 540 }}>
                        <Row style={{ alignItems: 'center' }}>
                            {
                                window.innerWidth > 700 &&
                                <img src={movie.info.Poster} height={300} />
                            }
                            <Column>
                                <RateSlider
                                    movie={movie}
                                    updateRating={updateRating('story')}
                                    category={'story'} />
                                <RateSlider
                                    movie={movie}
                                    updateRating={updateRating('character')}
                                    category={'character'} />
                                <RateSlider
                                    movie={movie}
                                    updateRating={updateRating('performance')}
                                    category={'performance'} />
                                <RateSlider
                                    movie={movie}
                                    updateRating={updateRating('visuals')}
                                    category={'visuals'} />
                                <RateSlider
                                    movie={movie}
                                    updateRating={updateRating('soundtrack')}
                                    category={'soundtrack'} />
                            </Column>
                        </Row>
                        <ActionButton onClick={() => saveMovie(movie)}>Save</ActionButton>
                    </Column>
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
    &.glow {
        text-shadow: white 0px 0px 10px;
    }
`

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: max-height .5s ease-in-out;
    max-height: 0px;
    overflow: hidden;
    &.open{
        border-bottom: gray solid;
        max-height: 500px;
    }
`

const ActionButton = styled.button`
    align-self: end
`
