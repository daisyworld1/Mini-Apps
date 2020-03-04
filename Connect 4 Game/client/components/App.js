import React from 'react';
import Game from './Game.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentPlayer: 'blue',
          red: [],
          blue: [],
          items: [],
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        //e.preventDefault();
        if(this.state.currentPlayer === 'blue'){
            console.log(e.target.id, 'is blue');
            
            this.setState({currentPlayer: 'red'}, () => {
                document.getElementById('currentPlayer').innerHTML = 'Current player is: ' + this.state.currentPlayer;
            });
            let blue = this.state.blue;
            blue.push(e.target.id);
            this.setState({blue: blue}, () => {
                console.log('this.state.blue: ', this.state.blue)
            });
  
    
        } else {
            console.log(e.target.id, 'is red');
            this.setState({currentPlayer: 'blue'}, () => {
                document.getElementById('currentPlayer').innerHTML = 'Current player is: ' + this.state.currentPlayer;
            });
            let red = this.state.red;
            red.push(e.target.id);
            this.setState({red: red}, () => {
                console.log('this.state.red: ', this.state.red)
            });
        }
    }

    buildItems() {
        let items = []
        for (let i = 1; i < 43; i ++) {
            items.push(<span key={i.toString()} id={i.toString()} className={'dot'} onClick={this.handleClick}></span>)
            if(i%7===0){
                items.push(<br key={i.toString() + 'LineBreak'}></br>)
            }
        }
        return items;
    }
    
    render() {
      let items = this.buildItems();
      return (
        <div>
            <h1>Connect Four</h1>
            <h3>Two players: blue or red</h3>
            <h3 id='currentPlayer'>Player blue starts first</h3>
            <div id='board'>
            {items}
            </div>
            <Game red={this.state.red} blue={this.state.blue} currentPlayer={this.state.currentPlayer} />
        </div>
      );
  }
}
export default App;