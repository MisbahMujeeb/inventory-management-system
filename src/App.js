import './App.css';
import Dashboard from './components/Dashboard'
import LoginSignUp from './components/loginsignUp';
import Sidebar from './components/sidebar';
import TopBar from './components/topbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Seccrets from './components/Seccrets'
import 'react-toastify/dist/ReactToastify.css'
import Main from './components/main';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/registerLogin" element={<LoginSignUp/>}/>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
    </>
    // <LoginSignUp />

  );
}

export default App;
