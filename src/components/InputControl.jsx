import styled from "styled-components";

const InputControl = ({ value, update, clear }) => {

    return (
        <Container>
            <input
                placeholder="search titles..."
                style={{ width: '100%', padding: '0.6em', fontSize: '1em' }}
                value={value}
                onChange={e => update(e.target.value)}
            />
            {
                value &&
                <Clear onClick={clear}>x</Clear>
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