import { Form } from "formik";
import styled from "styled-components";

export const CustomForm = styled(Form)`
    width: 80%;
    margin: 50px;
    border: 1px solid grey;
    border-radius: 8px;
    box-sizing: border-box;
    outline: 0;
`;

export const CustomLabel = styled.label`
    color: #f0f8ff;
    margin-right: 20px;
`;

export const CustomInput = styled.input`
    box-sizing: border-box;
    width: 90%;
    line-height: 35px;
    padding-left: 15px;
    margin: 10px 0;

    border-radius: 5px;
    background: hsla(0,0%,100%,.25);
    color: #f0f8ff;
    
    outline: none;
    border: 0;

    // Prevent Autofill color changing
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
        -webkit-transition-delay: 9999s;
    }

    &:focus {
        opacity: 0.85;
        outline: none;
        border: 0;

        color: #f0f8ff;
    }
    &::placeholder {
        color: #f0f8ff;
        opacity: 0.8;
    }

`;

export const FormFooter = styled.div`
    padding: 5px 15px;
    display: flex;
    justify-content: end;
`;

export const SubmitButton = styled.button`
    //background-color: #1C0C5B;
    font-size: 14px;
    border-radius: 5px;
    color: #f0f8ff;
    border: none;
    height: 35px;
    min-width: 100px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover{
        background-color: #646cff;
    }

    &.disabled{
        opacity: 0.4;
    }
`;
export const FormError = styled.div`
    font-style: italic;
    font-size: 10pt;
    color: red;
    margin: 0px;
    height: 13pt;

    &.hidden{
        visibility: hidden;
    }
    &.visible{
        visibility: visible;
    }
`;

export const DivResult = styled.div`
    color: #00ff00;
    border: 0;
    margin: 10px;
`