import React from 'react';
import Dropdown from 'react-dropdown';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import 'react-dropdown/style.css';

const Wrap = styled.div`
    display: grid;
    grid-template-columns: 14px 45% 45%;
    grid-gap: 5%;
    border: 1px solid #B4B4B4;
    margin: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0px 1px 0px 0px rgba(180,180,180, 0.6);
    @media (max-width: 550px) {
        grid-template-columns: 14px 95% 45%;
    }
    &:before{
        align-self: start;
        content: counter(count) ".";
        counter-increment: count;
        color: #8D207A;
        font-weight: 700;
        border-bottom: 2px solid #8D207A;
    }
`;

const Title = styled.p`
    text-align: left;
    margin: 0;
`;

const InputNumber = styled.div`
    height: 40px;
    border: 1px solid #B4B4B4;
    width: 200px;
    display: flex;
    @media (max-width: 550px) {
        grid-row: 2;
        grid-column: span 2;
        margin-left: calc(5% + 14px);
    }
    input{
        border: none;
        width: 180px;
        font-size: 20px;
        font-family: Blender-Bold;
        padding: 0 10px;
    }
`;
const RadioButtonsWrap = styled.div`
    @media (max-width: 550px) {
        grid-row: 2;
        grid-column: span 2;
        margin-left: calc(5% + 14px);
    }

`
export class DisplayQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            dropdownValue: ''
        }
    };
    onSelect = (option) => {
        this.setState({
            dropdownValue: option
        });
        this.props.callback1(option.label)
    };
    handleSubmit = (e) => {
        this.props.callback2(e.target.value)
    };
    handleChange = (e) => {
        this.props.callback3(e.target.value)

    };
    render() {
        const defaultOption = this.state.dropdownValue;

        if (this.props.type === 'radio') {
            var inputRadio = this.props.answer.map( (elem,index) => (
                <div key = {index}><input  onChange = {this.handleSubmit} type="radio" value={elem} name = "radio"/>{elem}</div> 
            ))
        }
        return (
            <Wrap>
                <Title>{this.props.question}</Title>
                {this.props.type === 'dropdown' 
                    ? <Dropdown 
                        options={this.props.answer} 
                        onChange={this.onSelect} 
                        value={defaultOption} 
                        placeholder="Please choose" /> 
                    : null
                }
                {this.props.type === 'radio' 
                    ? <RadioButtonsWrap >{inputRadio}</RadioButtonsWrap> 
                    : null
                }
                {this.props.type === 'text' 
                    ? <InputNumber><input onChange = {this.handleChange} type = "number" /></InputNumber> 
                    : null
                }
            </Wrap>
        )
    }
}
DisplayQuestions.propTypes = {
    callback1: PropTypes.func,
    callback2: PropTypes.func,
    callback3: PropTypes.func,
}
