import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Entry from './components/Entry'
import Auth from './components/Auth'
import Login from './components/Login'
import Layout from './components/Layout'
import 'semantic-ui-css/semantic.min.css'
import './styles/base.css'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Entry}/>
      <Route path="/register" component={Auth}/>
      <Route path="/login" component={Login}/>
    </Router>

  );
}

export default App;
