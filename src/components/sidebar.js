import React, { useState, useEffect } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 640)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const Menus = [
    { title: 'Dashboard', src: 'chart_fill', path: '/' },
    // { title: 'Add Items', src: 'addProducts', path: '/AddItems' },
    { title: 'Items', src: 'products', path: '/MyStock' },
    { title: 'Purchase Details', src: 'products', path: '/PurchaseItems' },
    { title: 'Stores', src: 'Search', path: '/Stores' },
    { title: 'Sales', src: 'products', path: '/Sales' },
    // { title: 'User Pages', src: 'Search', path: '/' },
  ]

  return (
    <div
      className={`${
        open ? 'w-72' : 'w-20'
      } p-5 pt-8 h-[100vh] duration-300 bg-slate-700 relative`}
    >
      <div className="pb-1 flex justify-end text-white">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="flex gap-x-4 items-center">
        <img
          src={require('../assets/logo.png')}
          className={`cursor-pointer w-16 duration-500 ${
            open && 'rotate-[360deg]'
          }`}
          alt=""
        />
        <h1
          className={`text-white origin-left font-medium md:text-lg text-sm duration-300 ${
            !open && 'scale-0'
          }`}
        >
          Inventory Management
        </h1>
      </div>

      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link to={Menu.path} key={index}>
            <li
              key={index}
              className={`group flex rounded-md p-2 cursor-pointer hover:bg-yellow-50
               hover:text-slate-700 duration-50 text-gray-300 text-sm items-center gap-x-4`}
            >
              <img className="w-8" src={require(`../assets/${Menu.src}.png`)} />

              <span
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} whitespace-pre origin-left duration-500`}
              >
                {Menu.title}
              </span>

              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white font-semibold whitespace-pre rounded-md drop-shadow-lg
                 px-0 py-0 w-0 overflow-hidden group-hover:px-2 m-2 group-hover:py-1 group-hover:left-14 group-hover:duration-50 group-hover:w-fit`}
              >
                {Menu?.title}
              </h2>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
