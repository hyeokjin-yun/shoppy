import './App.css';
import Navbar from './components/Navbar';
import {Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />
      <div className='center'>
        <Outlet />
      </div>
    </>
  );
}

export default App;
