import React from 'react'
import {Switch, Route, BrowserRouter} from "react-router-dom"
import Register from "./Components/auth/register"
import Login from "./Components/auth/login"
import OTP from "./Components/auth/otpVerification"
import ChatHome from "./Components/chats/chat"
import './App.css';

function App(props) {
  // useEffect(()=>{
  //   axios.get(`http://localhost:5000/api/messages/getChatsForUser/`)
  // },[])
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/verifyOtp" component={OTP} />
      <Route path="/home" component={ChatHome} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
