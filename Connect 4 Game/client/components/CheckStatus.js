import React from 'react';

class CheckStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          winner: 'no winner yet!'
        };
        this.checkHorizontal = this.checkHorizontal.bind(this);
        this.checkVertical = this.checkVertical.bind(this);
        this.checkLeftDiagonal = this.checkLeftDiagonal.bind(this);
        this.checkRightDiagonal = this.checkRightDiagonal.bind(this);
    }
    
    checkHorizontal() {
      let possibilities = [];
      for (let i = 1; i < 42; i += 7) {
        for (let j = 0; j < 4; j ++) {
            let onePosibility = [];
            for(let k = 0; k < 4; k ++) {
                onePosibility.push(j+i+k)
            }
            possibilities.push(onePosibility);
        }
      }
      return possibilities;
    }

    checkVertical() {
      let possibilities = [];
      for (let i = 1; i < 8; i += 1) {
        for(let j = i; j < (i + 7 * 3); j += 7) {
          let onePosibility = [];
          for (let k = 0; k < 28; k += 7) {
            onePosibility.push(j+k)
          }
          possibilities.push(onePosibility);
        }
      }
      return possibilities;
    }

    checkLeftDiagonal(){
      let possibilities = [];
      for (let i = 1; i <= 4; i += 1) {
        for(let j = 0; j < 21; j += 7) {
          let onePosibility = [];
          for (let k = 0; k < 32; k += 8) {
            onePosibility.push(i+j+k)
          }
          possibilities.push(onePosibility);
        }
      }
      return possibilities;
    }

    checkRightDiagonal(){
      let possibilities = [];
      for (let i = 4; i <= 7; i += 1) {
        for(let j = 0; j < 21; j += 7) {
          let onePosibility = [];
          for (let k = 0; k < 24; k += 6) {
            onePosibility.push(i+j+k)
          }
          possibilities.push(onePosibility);
        }
      }
      return possibilities;
    }

    componentWillReceiveProps(prevProps){
      let winningScenarios = this.checkHorizontal().concat(this.checkVertical()).concat(this.checkRightDiagonal()).concat(this.checkLeftDiagonal())
      let redPositions = prevProps.redPositions || [];
      let bluePositions = prevProps.bluePositions || [];
      let resultRed = false;
      let resultBlue = false;
      for (let val of winningScenarios) {
        resultRed = val.every((el) => redPositions.includes(el))
        resultBlue = val.every((el) => bluePositions.includes(el))

        if(resultBlue) {
          this.setState({winner: 'blue'})
          return;
        } else if (resultRed) {
          this.setState({winner: 'red'})
          return;
        } 
      }
      
      
    }

    render() {
      return (
        <div>  
            <h3>{`Winner: ${this.state.winner}`}</h3>
        </div>
      );
    }
  }
  export default CheckStatus;