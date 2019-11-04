import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import Users from './components/Users';
import Messages from './components/Messages';

function App() {
  return (
    <div className='App'>
      <h1>React App - Apollo Client</h1>
      <h3>Connected to Yoga-Prisma Back End with PostgresQL database</h3>
      <Nav />
      <Route path='/users' component={Users} />
      <Route path='/messages' component={Messages} />
    </div>
  );
}

export default App;
