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
    margin: 0px -15px;
    cursor: pointer;
    z-index: 1;
`