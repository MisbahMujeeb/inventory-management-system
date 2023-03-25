import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    const [open, setOpen] = useState(true)
    const Menus = [
        { title: 'Dashboard', src: "chart_fill" , ref:'/' },
        { title: 'Products', src: "products", ref:'/'},
        { title: 'Add Products', src: "addProducts", ref:'/AddProducts' },
        { title: 'Sell Item', src: "Search" , ref:'/' },
        { title: 'Add Suppliers', src: "products", ref:'/' },
        { title: 'MyStocks', src: "Search" ,  ref:'/' }
    ]
    return (
        <div className={`${open ? "w-72" : "w-20"}
    p-5 pt-8
     h-screen duration-300 bg-slate-700 relative`}>
            <div className='pb-1 flex justify-end text-white' >
                <HiMenuAlt3 size={26} className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                />
            </div>
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
                        className={`group flex  rounded-md p-2 cursor-pointer hover:bg-yellow-50
                hover:text-slate-700 duration-200
                 text-gray-300 text-sm items-center gap-x-4 
              
                
                `}
                    >
                        <img className='w-8' src={require(`../assets/${Menu.src}.png`)} />
                        <span
                            style={{
                                transitionDelay: `${index + 3}00ms`
                            }}
                            className={`${!open && "opacity-0 translate-x-28 overflow-hidden"}
                        whitespace-pre
                         origin-left duration-500 
                          `}>
                            {Menu.title}
                        </span>
                        <h2
                            className={`${open && "hidden"
                                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-
                 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                 m-2
                 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                        >
                        <Link to={Menu.ref}>
                            {Menu?.title}
                        </Link>
                        </h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar