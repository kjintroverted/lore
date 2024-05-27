import styled from "styled-components";

const InputControl = ({ value, update }) => {

    return (
        <Container>
            <input style={{ width: '100%' }} value={value} onChange={e => update(e.target.value)} />
            {
                value &&
                <Clear onClick={() => update("")}>x</Clear>
            }
        </Container>
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

const Container = styled.div`
    display: flex;
    width: 100%;
`