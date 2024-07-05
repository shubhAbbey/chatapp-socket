import React, {useState} from 'react';
import axios from "axios"
import { Redirect } from 'react-router-dom';
const OtpVerification = (props) => {
    const [otp, setOtp] = useState("")
    const [mobile, setMobile] = useState(props.location.state)
    const [isRedirect, setIsRedirect] = useState(false)
    const submit = (e) => {
        e.preventDefault()
        console.log(mobile)
        let obj = {
            otp,
            mobile
        }
        axios.post("http://localhost:5000/api/users/verifyOtp",obj).then(res=>{
            console.log(res)
            if(res.data.status){
                localStorage.setItem('Authorization',res.data.token)
                setIsRedirect(true)
            }else{
                setIsRedirect(false)
            }
        }).catch(err=>alert(err.message))
    }
    if(isRedirect) return <Redirect to={{pathname:"/home"}}/>
    return (
        <div>
            <label for="otp">
                OTP
                <input type = "text" name = "otp" id = "otp" onChange={(e)=>setOtp(e.target.value)}/>
            </label>
            <button onClick={(e)=>submit(e)}> Login</button>
        </div>
    );
};

export default OtpVerification;