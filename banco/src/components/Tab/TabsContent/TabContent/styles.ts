import styled from "styled-components"

export const ContentDiv = styled.div`
    border: 0px;
    display: none;
    overflow: auto;

    &.active{
        display: block;
    }
`;