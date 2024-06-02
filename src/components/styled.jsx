import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    background: black;
    padding: .5em;
    align-items: center;
`;

export const Main = styled.div`
    display: flex;
    justify-content: center;
    padding: 1em;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`

export const Row = styled.div`
    display: flex;
    &.align-center {
        align-items: center;
    }
`

export const IconButton = styled.button`
    border-radius: 50%;
    padding: 6px 11px;
`

export const Spacer = styled.div`flex:1`;