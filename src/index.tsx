import React from 'react';
import ReactDOM from 'react-dom';
import { AppChat } from './AppChat';
import { UserProvider } from './context/user';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AppChat/>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);