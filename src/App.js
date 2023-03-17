import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { useState } from 'react';
import Page2 from './components/Page2'

function App() {
 const [open , setOpen] = useState(true)
  const Menus = [
    {title:'Dashboard' , src : "chart_fill"},
    {title:'Inbox' , src : "Chat"},
    {title:'Accounts' , src : "Chat" , gap:true},
    {title:'Schedule' , src : "Chat"},
    {title:'Search' , src : "Search"},
    {title:'Analytics' , src : "Search"},
    {title:'Settings' , src : "Search"},
  ]

  return (
 <div className='flex'>
  <div className={`${open ? "w-72" : "w-20"}
  p-5 pt-8
   h-screen duration-300 bg-purple-900 relative`}>
    <img src="./assets/arrow.png" alt="arrow" 
  className={`${!open && 'rotate-180'} absolute cursor-pointer -right-3 top-9 w-7 border-2 rounded-full border-purple-900`}
   onClick={() => setOpen(!open)}
    />
    <div className='flex gap-x-4 items-center'>
      <img src="https://cdn-icons-png.flaticon.com/512/6260/6260788.png"
      className={`cursor-pointer w-20 duration-500`}
       alt="" />
       <h1 className={`text-white origin-left font-medium text-xl
       duration-300 ${!open && 'scale-0'}
       `}>
        Inventory Management
       </h1>
    </div>
    <ul className='pt-6'>
      {Menus.map((menu , index) => (
        <li key={index} 
          className="text-gray-300 text-sm"
        >
        <img src={`https://cdn-icons-png.flaticon.com/512/6260/6260788.png`} className='w-10' alt="" />        
        {/* {menu.title} */}
        </li>
      ))}
    </ul>
  </div>
  <div className="p-7 text-2xl font-semibold flex-1 h-screen">
  <Page2 />
  </div>
 </div>
  );
}

export default App;
