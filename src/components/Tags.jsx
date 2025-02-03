import { useState } from "react";
import styled from "styled-components";
import { Row } from "./styled";

const Tags = ({ movie }) => {

    const [tags, updateTags] = useState(movie && movie.tags ? movie.tags : [])

    const handleOnKey = (e) => {
        if (e.key === 'Enter') {
            if (!tags.includes(e.target.value)) updateTags([...tags, e.target.value])
            e.target.value = ""
        }
    }

    return (
        <Row>
            {
                tags.map((tag, index) => <Chip key={`tag-${index}`}>{tag}</Chip>)
            }
            <TagInput
                onClick={(e) => e.stopPropagation()}
                onKeyUp={handleOnKey}
                placeholder="add tag..."
            />
        </Row>
    )
}

export default Tags;

let TagInput = styled.input`
    margin: .1em;
`

let Chip = styled.p`
    background: darkred;
    border-radius: 10px;
    padding: 0em .5em;
    margin: .1em .2em;
    font-size: small;
`