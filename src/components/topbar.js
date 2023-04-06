import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const TopBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')


  const logOut = () => {
    navigate('/registerLogin');
    removeCookie('jwt');
    window.location.reload();
  };


  useEffect(() => {
    const varifyUser = async () => {
        const { data } = await axios.post(
          'http://localhost:4000/', {}, { withCredentials: true }
        )
        if (!data.status) {
          toast(`User id Not Found`, { theme: 'dark' })
        } else { 
          // setUserName({userId: data.uId , productQuantity:1 })
          setUserName(data.user.username)
          setUserEmail(data.user.email)
      }
    }
    varifyUser()
  }, [])

  return (
    <div className='bg-gray-200 h-16 grid'>
    <ToastContainer />
      <button
        className='justify-self-end mr-8 flex items-center'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img src={require('../assets/user.png')} alt='User Avatar' className='h-8 w-8 mr-2 bg-transparent' />
        {/* <span>Username</span> */}
      </button>

      {showDropdown && (
        <div className='absolute bg-white shadow-lg text-center z-1 mt-2 w-52 rounded-lg justify-center top-12 mx-5' style={{ right: 0 }}>
          <div className='bg-slate-700 h-12 rounded-t-lg'>
            <p className='block text-white font-bold pt-2'>
              Profile
            </p>
          </div>
          <p className='block px-4 py-1  text-gray-800 '>
            {userName}
          </p>
          <p className='block px-4 py-1 text-gray-800 '>
            {userEmail}
          </p>
          <button
            className='block w-full px-4 py-2 bg-slate-600 text-white text-center rounded-b-lg hover:bg-slate-700'
            onClick={logOut}
          >
            Log Out
          </button>

        </div>

      )}
    </div>
  );
};

export default TopBar;
