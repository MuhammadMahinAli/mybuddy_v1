/* eslint-disable react/prop-types */

import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {
    const { loading} = useContext(AuthContext)
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    const location = useLocation()
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>


};

export default PrivateRoute;