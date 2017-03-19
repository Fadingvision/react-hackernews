import React from 'react';
import { Link } from 'react-router';
import 'ASSET/less/main.styl';

const App = ({
    children,
    location
}) => (
    <div id="app">
      <header clssName="header">
        <nav clssName="inner">
          <Link to="/">
            <img className="logo" src="~public/logo-48.png" alt="logo"></img>
          </Link>
          <Link to="/top">Top</Link>
          <Link to="/new">New</Link>
          <Link to="/show">Show</Link>
          <Link to="/ask">Ask</Link>
          <Link to="/job">Jobs</Link>
          <a clssName="github" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank">
            Built with Vue.js
          </a>
        </nav>
      </header>
      <div className="container">
            { children }
      </div>
    </div>
)

export default App;