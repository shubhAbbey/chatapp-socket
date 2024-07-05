import axios from 'axios';
import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'
const Register = (props) => {
    const [data, setData] = useState({})
    const [isRedirect, setIsRedirect] = useState(false)
    const setUserData = (e) => {
        let obj = {
            ...data,
            [e.target.name]:e.target.value
        }
        setData(obj)
    }
    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/users/register",data).then(res=>{
            if(res.data.status){
                setIsRedirect(true)
            }else{
                setIsRedirect(false)
            }
        })
    }
    if(isRedirect){
        return <Redirect to = {{pathname:"/login"}}/>
    }
    return (
        <div>
            <label for="username">
                User Name
                <input type = "text" name = "userName" id = "username" onChange={(e)=>setUserData(e)}/>
            </label> 
            <label for="mobile">
                Mobile
                <input type = "text" name = "mobile" id = "mobile" onChange={(e)=>setUserData(e)}/>
            </label>    
            <label for="email">
                Email
                <input type = "text" name = "email" id = "email" onChange={(e)=>setUserData(e)}/>
            </label>
            <button onClick={(e)=>submit(e)}> Register</button>
        </div>
    );
};

export default Register;