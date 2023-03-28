import './App.css';
import LoginSignUp from './components/loginsignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import Main from './components/main';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/registerLogin" element={<LoginSignUp/>}/>
        <Route path="*" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
    </>
    // <LoginSignUp />

  );
}

export default App;
