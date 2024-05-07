import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const {user, loginWithRedirect, logout} = useAuth0();

  useEffect(() => {
    // console.log(`user: ${user}`)
    // console.log(`isAuthenticated: ${isAuthenticated}`)
    // console.log(`isLoading: ${isLoading}`)    
      setMyUser(user)    
  }, [user])

  const valuesToShare = {
    logout,
    loginWithRedirect,
    myUser
  }

  return (
    <UserContext.Provider value={valuesToShare}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
