import styled from "styled-components";
import { Row } from "./styled";

const Tags = ({ tags = [], updateTags, tagClick = () => { }, enabled = true }) => {

    const handleOnKey = (e) => {
        if (e.key === 'Enter') {
            if (!tags.includes(e.target.value)) updateTags([...tags, e.target.value])
            e.target.value = ""
        }
    }

    const removeTag = (index) => (e) => {
        e.stopPropagation()
        updateTags([...tags.slice(0, index), ...tags.slice(index + 1)])
    }

    const handleClick = (e, tag) => {
        e.stopPropagation()
        tagClick(tag)
    }

    return (
        <Row>
            {
                tags.map((tag, index) =>
                    <Chip key={`tag-${index}`} onClick={e => handleClick(e, tag)}>
                        <Remove onClick={removeTag(index)}>X</Remove>
                        {tag}
                    </Chip>)
            }
            {
                enabled &&
                <TagInput
                    onClick={(e) => e.stopPropagation()}
                    onKeyUp={handleOnKey}
                    placeholder={`${tags.length ? 'add' : 'no'} tags...`}
                />
            }
        </Row>
    )
}

export default Tags;

let TagInput = styled.input`
    margin: .1em;
    flex: 1;
    border: none;
    background: none;
    &:focus-visible {
        outline: none;
    }
`

let Chip = styled.div`
    display: flex;
    background: lightgray;
    color: #242424;
    border-radius: 10px;
    padding: 0em .5em;
    margin: .1em .2em;
    font-size: small;
    font-weight: bold;
    align-self: end;
    cursor: pointer;
`

let Remove = styled.div`
    color: red;
    padding: 0em .4em;
    margin-left: -.4em;
    cursor: pointer;
`