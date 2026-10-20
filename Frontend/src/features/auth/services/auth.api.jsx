import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// ------------------------------------------------------------------------register-------------------------------------
export const register = async ({username , email , password})=>{

   try {
     const response = await api.post('/api/auth/register' , {
        username,email,password
    })

    return response.data
    
   } catch (error) {
    console.log(error)
   }
}

// -----------------------------------------------------------------------------login------------------------------------
export const login = async ({email , password})=>{

    try {
        const response = await api.post("/api/auth/login" , {
            email , password
        })

        return response.data
        
    } catch (error) {
        console.log(error)
    }

}

// --------------------------------------------------------------------------------------logout---------------------------
export const logout = async()=>{
    try {
        const response = await api.get('/api/auth/logout')
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}

// ------------------------------------------------------------------get-me---------------------------------------

export const getMe = async()=>{

    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (error) {
        console.log("getMe error:", error.response?.data || error.message);
        throw error;
    }

}