import SignIn from '../form/SignIn.component';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.context';
import MainMenu from '../main-menu/MainMenu.component';
import { IUserContext } from '../../context/userContext.context';
import './App.css';

function App() {
  const {user, theme} = useContext<IUserContext>(UserContext);

  return (
    <div className={`App ${theme}`}>
      <div className='app_container'>
        {user.userName ? <MainMenu /> : <SignIn />}  
      </div>
    </div>
  );
}

export default App;
