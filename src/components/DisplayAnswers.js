import React from 'react';
import styled from 'styled-components';

const ShowAnswers = styled.div`
    p, h3{
        margin: 0.3rem 0;
    }

`

export class DisplayAnswers extends React.Component {
    render() {
        return (
            <ShowAnswers>
                <p>{this.props.questionAnswer}</p>
                <h3>{this.props.answerDropdown}</h3>
                <h3>{this.props.answerRadio}</h3>
                <h3>{this.props.answerNumber}</h3>
            </ShowAnswers>
        )
        
    }
}
