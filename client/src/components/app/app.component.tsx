import SignInForm from '../sign-in-form/sign-in-form.component';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import MainMenu from '../main-menu/main-menu.component';
import { IUserContext } from '../../context/user.context';
import './app.style.css';
import { IThemeContext, ThemeContext } from '../../context/theme.context';

function App() {
  const {user} = useContext<IUserContext>(UserContext);
  const {theme} = useContext<IThemeContext>(ThemeContext);

  return (
    <div className={`app app_theme_${theme}`}>
      <div className='app__container'>
        {user.userName ? <MainMenu /> : <SignInForm />}  
      </div>
    </div>
  );
}

export default App;
