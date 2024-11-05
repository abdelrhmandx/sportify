import './App.css'

import Sidebar from './components/Sidebar';
import { useLocation } from 'react-router-dom';
import {Outlet} from 'react-router-dom';

function App() {
 const location  = useLocation();
 let appGlassClass = location.pathname === '/dashboard' ?'AppGlass' : 'AppGlass table';
  return (
    <div className="App">
      <div className={appGlassClass}>
        <Sidebar/>
        <Outlet />
      </div>
    </div>
  );
}

export default App;