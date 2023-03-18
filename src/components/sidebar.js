import React , {useState} from 'react'

const Sidebar = () => {
    const [open , setOpen] = useState(true)
    const Menus = [
      {title:'Dashboard' , src : "chart_fill"},
      {title:'Add Products' , src : "addProducts"},
      {title:'Products' , src : "products" , gap:true},
      {title:'Search' , src : "Search"},
    //   {title:'Search' , src : "Search"},
    //   {title:'Analytics' , src : "Search"},
    //   {title:'Settings' , src : "Search"},
    ]
  return (
    <div className={`${open ? "w-72" : "w-20"}
    p-5 pt-8
     h-screen duration-300 bg-slate-700 relative`}>
       <img
            src={require("../assets/arrow.png")}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-700
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
      <div className='flex gap-x-4 items-center'>
        <img src={require('../assets/logo.png')}
        className={`cursor-pointer w-16 duration-500 ${open && "rotate-[360deg]"}`}
         alt="" />
         <h1 className={`text-white origin-left font-medium text-xl
         duration-300 ${!open && 'scale-0'}
         `}>
          Inventory Management
         </h1>
      </div>
      <ul className='pt-6'>
      {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-yellow-50
                hover:text-slate-700 duration-200
                 text-gray-300 text-sm items-center gap-x-4 
              
                
                `}
              >
                <img className='w-8' src={require(`../assets/${Menu.src}.png`)} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
      </ul>
    </div>
  )
}

export default Sidebar