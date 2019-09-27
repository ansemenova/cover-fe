import './App.css';
import React, {Component} from 'react';
import TrainMap from "./TrainMap";


const position = [56.326887, 44.005986]

class App extends Component {
  render() {
    return (
        <div>
          <TrainMap/>
        </div>
    );
  }
}

export default App;