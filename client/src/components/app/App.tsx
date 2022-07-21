import SignIn from '../form/SignIn.component';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.context';
import MainMenu from '../main-menu/MainMenu.component';
import { IUserContext } from '../../context/userContext.context';
import './App.css';
import { IThemeContext, ThemeContext } from '../../context/themeContext.context';

function App() {
  const {user} = useContext<IUserContext>(UserContext);
  const {theme} = useContext<IThemeContext>(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <div className='app_container'>
        {user.userName ? <MainMenu /> : <SignIn />}  
      </div>
    </div>
  );
}

export default App;
