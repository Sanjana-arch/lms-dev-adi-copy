import React from 'react'
import { useNavigate,Route } from 'react-router-dom'
const ProtectedRoutes = ({authStatus, element:Component,...rest}) => {
   
    return (
     
     <Route {...rest} render ={()=>
    {
        if (authStatus)
        return <Component ></Component>
        else
        {
            navigate('/login')
        }
    }}></Route>
     
    )
}

export default ProtectedRoutes
