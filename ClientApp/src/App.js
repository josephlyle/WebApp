import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { GitHub } from './components/GitHub';
import { Reddit } from './components/Reddit';
import { Game } from './components/Game'
import './custom.css';

export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/github' component={GitHub} />
        <Route path='/reddit' component={Reddit} />
        <Route path='/game' component={Game} />
      </Layout>
    );
  }
}
