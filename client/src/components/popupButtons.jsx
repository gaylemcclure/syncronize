import React from 'react';
import styled from 'styled-components';


export const SubmitButton = ({ submitText, submitFunction }) => {
    return (
        <MainButton className="submit-button" onClick={submitFunction}>{submitText}</MainButton>
    )
}

export const CancelButton = ({ cancelText, cancelFunction }) => {
    return (
        <MainButton className="cancel-button" onClick={cancelFunction}>{cancelText}</MainButton>
    )
}

const MainButton = styled.button`
    
    border: none;
    padding: 0.75rem  1.5rem;
    margin: 0.5rem;
    border-radius: 8px;
    font-weight: 600;
    
    &&:hover {
        opacity: 0.6;
    }
`

