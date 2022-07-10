import './App.css';
import { useState } from 'react';
import SignIn from '../form/SignIn.component';
import { useEffect } from 'react';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => setIsAuth(!!localStorage.getItem('user')), [])

  return (
    <div className="App">
      {!isAuth ? <SignIn setAuthFunc={setIsAuth}/> : null}      
    </div>
  );
}

export default App;
