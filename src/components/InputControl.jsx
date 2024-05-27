import styled from "styled-components";

const InputControl = ({ value, update }) => {

    return (
        <>
            <input value={value} onChange={e => update(e.target.value)} />
            {
                value &&
                <Clear onClick={() => update("")}>x</Clear>
            }
        </>
    )
}

export default InputControl;

const Clear = styled.p`
    position: relative;
    right: 15px;
    margin: 0px;
    cursor: pointer;
    z-index: 1;
`