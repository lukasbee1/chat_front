import React from 'react';
import '../css/App.css';
import './socket_server_client';

const url = process.env.REACT_APP_GENERATED_GOOGLE_URL;

console.log(url);
function App() {
  return (
    <div className="App">
      <div className="authContainer">
        <div className="auth-google">
          <a href={ url }>Login with Google</a>

        </div>
      </div>
    </div>
  );
}

export default App;
