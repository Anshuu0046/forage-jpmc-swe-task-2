import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
 data: ServerRespond[],
 showGraph: boolean,
}

class App extends Component<{}, IState> {
 constructor(props: {}) {
    super(props);

    this.state = {
      data: [],
      showGraph: false,
    };
 }

 renderGraph() {
    if(this.state.showGraph) {
      return (<Graph data={this.state.data}/>);
    }
    // Return null or some placeholder content if showGraph is false
    return null;
 }

 getDataFromServer() {
    // Removed the unnecessary x variable and interval clearing logic
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // Update the state with new data from the server
        this.setState({
          data: [...this.state.data, ...serverResponds],
          showGraph: true,
        });
      });
    }, 100);

    // Optionally, you can add logic to clear the interval based on some condition
    // For example, if you want to stop after a certain number of updates:
    // let updateCount = 0;
    // if (updateCount > 10) {
    //   clearInterval(interval);
    // }
    // updateCount++;
 }

 render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
 }
}

export default App;
