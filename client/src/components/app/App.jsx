import './App.css';
import { useState } from 'react';
import SignIn from '../form/SignIn.component';
import { useEffect } from 'react';
import { useContext } from 'react';
import { setUserAction, UserContext } from '../../context/userContext.context';
import { ioConnect } from '../../API/sockets/sockets';
import MainMenu from '../main-menu/MainMenu.component';

function App() {
  const {state} = useContext(UserContext);

  return (
    <div className="App">
      {!state.user ? <SignIn /> : <MainMenu />}      
    </div>
  );
}

export default App;
