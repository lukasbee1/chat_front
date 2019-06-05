import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import '../css/App.css';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/chat" component={MainPage} />
        </div>
      </Router>
    );
  }
}

export default App;
