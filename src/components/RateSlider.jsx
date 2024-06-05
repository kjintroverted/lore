import styled from "styled-components";
import { Column, Row } from "./styled";
import { RATINGS } from "../util/util";

const RateSlider = ({ movie, category, updateRating }) => {
    return (
        <Row style={{ alignItems: "center" }}>
            <Rating>
                {movie.rating && movie.rating[category] ?
                    movie.rating[category] : "-"}
            </Rating>
            <Column>
                <Label>
                    {category}
                </Label>
                <input
                    style={{ width: 150 }}
                    defaultValue={
                        (movie.rating && movie.rating[category]) ?
                            movie.rating[category]
                            : 5
                    }
                    onChange={e => updateRating(+e.target.value)}
                    type="range"
                    min="1" max="10" />
                <Helper>
                    {
                        (movie.rating && movie.rating[category]) ?
                            RATINGS[category][movie.rating[category] - 1]
                            : "-"
                    }
                </Helper>
            </Column>
        </Row>
    )
}

export default RateSlider;

const Rating = styled.h3`
    margin: 0em .5em;
    font-size: 1.5em;
`

const Label = styled.p`
    margin: 0px;
    position: relative;
    top: 2px;
    font-size: small;
    font-weight: bold;
`

const Helper = styled.p`
    margin: 0px;
    position: relative;
    bottom: 5px;
    left: 5px;
    font-size: .7em;
`