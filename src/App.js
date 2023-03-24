import './App.css';
import Dashboard from './components/Dashboard'
import LoginSignUp from './components/loginsignUp';
import Sidebar from './components/sidebar';
import TopBar from './components/topbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Seccrets from './components/Seccrets'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/registerLogin" element={<LoginSignUp/>}/>
        <Route path="/" element={<Seccrets/>}/>
      </Routes>
    </BrowserRouter>
    </>
    // <LoginSignUp />
//  <div className='flex'>
//   <Sidebar />
//   <div className=" text-2xl font-semibold flex-1 h-screen">
//   <TopBar />
//   <Dashboard />
//   </div>
//  </div>
  );
}

export default App;
