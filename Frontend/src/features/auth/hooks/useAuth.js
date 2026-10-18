import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {register , login , logout , getMe} from "../services/auth.api"

export const useAuth = ()=>{

    const context = useContext(AuthContext)
    const {user,setUser , loading , setLoading} = context


    // ---------------------------------------------------------------------------------------------handleLogin
    const handleLogin = async({email , password})=>{

        setLoading(true)
        try {
            const data = await login({email , password})
        // "user" is from the backend
        setUser(data.isExisted)
        } catch (error) {
            
        }finally{
           setLoading(false)
        }
        
        
    }

    // ----------------------------------------------------------------------------------------------handleRegister
    const handleRegister = async({username , email , password})=>{
        setLoading(true)
        try {
            const data = await register({username , email , password})
        setUser(data.user)
            
        } catch (error) {
            
        }finally{
          setLoading(false)
        }
       
    }

    // ------------------------------------------------------------------------------------------handleLogout
    const handleLogout = async()=>{
        setLoading(true)
        try {
            const data = await logout()
        setUser(null)
        } catch (error) {
            
        }finally{
           setLoading(false)
        }
  
    }

    return{user , loading , handleRegister , handleLogin , handleLogout}
    

}