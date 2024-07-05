import React, {useState} from 'react';
import axios from "axios"
import { Redirect } from 'react-router-dom';
const Login = (props) => {
    const [mobile, setMobile] = useState("")
    const [isRedirect, setIsRedirect] = useState(false)
    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/users/login",{mobile}).then(res=>{
            console.log(res)
            if(res.data.status)
            setIsRedirect(true)
            else setIsRedirect(false)
        }).catch(err=>alert("Not Registered"))
    }
    if(isRedirect){
        return <Redirect to={{pathname:"/verifyOtp", state:mobile}}/> 
    }
    return (
        <div>
            <label for="mobile">
                Mobile
                <input type = "text" name = "mobile" id = "mobile" onChange={(e)=>setMobile(e.target.value)}/>
            </label>
            <button onClick={(e)=>submit(e)}> Login</button>
        </div>
    );
};

export default Login;