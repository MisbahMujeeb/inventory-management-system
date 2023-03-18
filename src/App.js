import './App.css';
import Dashboard from './components/Dashboard'
import Sidebar from './components/sidebar';

function App() {
  return (
 <div className='flex'>
  <Sidebar />
  <div className="p-7 text-2xl font-semibold flex-1 h-screen">
  <Dashboard />
  </div>
 </div>
  );
}

export default App;
