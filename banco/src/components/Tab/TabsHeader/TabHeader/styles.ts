import styled from "styled-components"

export const TabA = styled.a`
    text-decoration: none;
    color: #f8f8f8;
`;
export const TabLi = styled.li`
    margin-right: 15px;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Inter', Arial, Helvetica;
    border: none;

    &:hover{
        & a{
            opacity: 0.5;
        }
    }

    &.active{
        font-weight: 700;
        border-bottom: 3px solid #f8f8f8;
    }
`;