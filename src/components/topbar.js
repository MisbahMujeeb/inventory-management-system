import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const TopBar = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState('misbah@gmail.com')
  const [userName, setUserName] = useState('misbah')


  const logOut = () => {
    navigate('/registerLogin');
    removeCookie('jwt');
    window.location.reload();
  };

  return (
    <div className='bg-gray-200 h-16 grid'>
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
