import React from 'react';
import CheckStatus from './CheckStatus.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          board: {},
          bluePositions: [],
          redPositions: []
        };
    }
    componentWillReceiveProps(){

        //find currentPiece index
        let currentPiece = null;
        if(this.props.currentPlayer === 'blue') {
            currentPiece = this.props.blue[this.props.blue.length - 1] 
        } else {
            currentPiece = this.props.red[this.props.red.length - 1] 
        }
        
        //create board obj that records the number of pieces in each column
        let board = this.state.board;
        if(!board[currentPiece % 7]){
            board[currentPiece % 7] = 1;
        } else {
            board[currentPiece % 7] += 1;
        }
        this.setState({board: board});

        //drop pieces to it's correct positions
        if(currentPiece % 7 === 0) {
            let currentPosition = (6 - board[currentPiece % 7]) * 7 + 7;
            this.setState({currentPosition: currentPosition});
            
            if (this.props.currentPlayer === 'blue') {
                let bluePosition = this.state.bluePositions;
                bluePosition.push(currentPosition);
                this.setState({bluePosition: bluePosition});
                $('#' + currentPosition.toString()).addClass('blue');
            } else {
                let redPosition = this.state.redPositions;
                redPosition.push(currentPosition);
                this.setState({redPosition: redPosition})
                $('#' + currentPosition.toString()).addClass('red');
            }
        } else {
            let currentPosition = (6 - board[currentPiece % 7]) * 7 + currentPiece % 7;
            this.setState({currentPosition: currentPosition})
            if (this.props.currentPlayer === 'blue') {
                let bluePosition = this.state.bluePositions;
                bluePosition.push(currentPosition);
                this.setState({bluePosition: bluePosition});
                $('#' + currentPosition.toString()).addClass('blue');
            } else {
                let redPosition = this.state.redPositions;
                redPosition.push(currentPosition);
                this.setState({redPosition: redPosition})
                $('#' + currentPosition.toString()).addClass('red');
            }
        }
    };

    render() {

      return (
        <div>
            <CheckStatus redPositions={this.state.redPosition} bluePositions={this.state.bluePosition} />
        </div>
      );
    }
  }
export default Game;