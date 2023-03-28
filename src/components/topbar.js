import React ,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const TopBar = () => {

  const navigate = useNavigate()
  // const [removeCookie] = useCookies([])
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  const logOut = () => {
    navigate('/registerLogin')
    removeCookie('jwt')
    window.location.reload()
  }
  return (
    <div className='bg-gray-200 h-16 grid'>
      <button onClick={logOut} className='justify-self-end mr-8'>Log out</button>
    </div>
  )
}

export default TopBar