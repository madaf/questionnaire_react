import React from 'react';
import styled from 'styled-components';
import {DisplayQuestions} from './DisplayQuestions';
import { DisplayAnswers } from './DisplayAnswers';

const MainContainerWrap = styled.div`
    position: relative;
    padding-top: 30px;
    min-height: 400px;
    height: auto;
    @media (max-width: 550px) {
        min-height: 450px;
    }
`;

const Bar = styled.div`
    position: relative;
    background: #FDCC00;
    font-size: 20px;
    font-family: Blender-Bold;
    width: 300px;
    height: 40px;
    text-align: center;
    color: #fff;
    margin: 0 0 20px -1px;
    line-height: 40px;
    span{
        position: absolute;
        left: 100%;
        width: 0; 
        height: 0; 
        border-right: 20px solid transparent;
        border-top: 40px solid #FDCC00;
    }
`;

const QuestionWrap = styled.div`
    margin: 0 1.5rem;
    counter-reset: count; 
    list-style-type:none;
`;

const AnswersWrap = styled.div`
    margin: 0 1.5rem;
    border: 1px solid #B4B4B4;
    box-shadow: 0px 1px 0px 0px rgba(180,180,180, 0.6);
    div{
        padding: 0  0 10px 20px;
    }
`;

const Button = styled.button`
    background: #0A304E;
    color: #fff;
    position: absolute;
    right: 0;
    width: 130px;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-family: Blender-Bold;
    margin: 0 1.5rem;
    padding: 0.7rem 1rem;
    border-radius: 3px;
    border: none;
    bottom: 15%;
    @media (max-width: 550px) {
        bottom: 10%;
    }
    :focus {
        outline: none;
    }
    :hover {
        cursor: pointer;
    }
`;

export class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            showResults: false,
            answer3: '',
            answer2: '',
            answer1: ''
        }
    };
    componentDidMount() {
        fetch('https://bitbucket.org/bronstenkate/front-end-test/raw/b42db052ad57aef806b10c3dd84aca382fd85851/questions.json')
        .then(response => response.json())
        .then(data => this.setState({ questions: data }));
    };
    formChild1_dropdown = (param1) => {
        this.setState({
          answer1: param1
        })
    };
    formChild1_radio = (param2) => {
        this.setState({
          answer2: param2
        })
    };
    formChild1_number = (param3) => {
        this.setState({
          answer3: param3
        })
    };
    handleClick = () => {
        this.setState({
            showResults: !this.state.showResults
        });
    };
    render() {
        const showQuestions = this.state.questions.map( item => (
            <DisplayQuestions
                key = {item.question}
                question = {item.question}
                answer = {item.options}
                type = {item.inputType}
                callback1 = {this.formChild1_dropdown}
                callback2 = {this.formChild1_radio}
                callback3 = {this.formChild1_number}
            />
        ));
        const showQuestionsInAnswers = this.state.questions.map( item => (
            item.inputType === "radio" 
                ? <DisplayAnswers
                    key = {item.question}
                    answerRadio = {this.state.answer2} 
                    questionAnswer = {item.question}
                /> 
                : null 
                || item.inputType === "dropdown" 
                ? <DisplayAnswers
                    key = {item.question}
                    answerDropdown = {this.state.answer1} 
                    questionAnswer = {item.question}
                /> 
                : null
                || item.inputType === "text" 
                ? <DisplayAnswers
                    key = {item.question}
                    answerNumber = {this.state.answer3} 
                    questionAnswer = {item.question}
                /> 
                : null 
        ));
        return(
            <MainContainerWrap>
                <Bar>{this.state.showResults ? "Results" : "Calculate starting dose"}<span></span></Bar>
                {this.state.showResults 
                    ? <AnswersWrap>{ showQuestionsInAnswers }</AnswersWrap>  
                    : <QuestionWrap>{ showQuestions }</QuestionWrap>}
                <Button 
                    style = {this.state.showResults 
                            ? {background: "#fff", color: "#0A304E", border: "1px solid #0A304E"} 
                            : {background: "#0A304E", color: "#fff"}}
                    onClick = {this.handleClick}>{this.state.showResults ? "Go back" : "Show results"}
                </Button>
            </MainContainerWrap>
        )
          
    }
}