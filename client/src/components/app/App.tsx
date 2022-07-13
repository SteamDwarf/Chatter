import './App.css';
import SignIn from '../form/SignIn.component';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.context';
import MainMenu from '../main-menu/MainMenu.component';
import { IUserContext } from '../../context/userContext.context';
import { Container } from '@mui/material';


function App() {
  const {user} = useContext<IUserContext>(UserContext);

  return (
    <div className="App">
        {user ? <MainMenu /> : <SignIn />}  
    </div>
  );
}

export default App;
