import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const navigate = useNavigate();
    // const [user,setUser] = useState(localStorage.getItem('userData'));
    const [user,setUser] =  useState(JSON.parse(localStorage.getItem('userData')) || {});
    // const [user,setUser] =  useState(JSON.parse(localStorage.getItem('userData')));

    // const [loading,setLoading] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     setLoading(true)
    //     if(token) {
    //         setUser(JSON.parse(localStorage.getItem('userData')));
    //         console.log(user);
    //     }
    // },[]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user,setUser,logout}}>
            {/* {loading && children} */}
            {children}
        </AuthContext.Provider>
    );
};
export {AuthContext,AuthProvider}




