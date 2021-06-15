import React, { useState } from "react";
import axios from "axios";

import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Wrapper from "../UI/Wrapper";


function Login (props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  function handleSubmit(event) {
      
    event.preventDefault();
  
  
    const url =  "https://apifromashu.herokuapp.com/api/login"
    const data = { email:email,password:password }
    axios.post(url, data)
        .then(response =>  {
            if (response.data.token) {
              console.log('login success ',response)
              // setisLogedin(true)
              localStorage.setItem('token', response.data.token)
              localStorage.setItem('userData', JSON.stringify(response.data))

            props.dispatch({
              type:"LOGIN",
              payload:{
                token:response.data.token,
              }
            })
              
              props.changeLoginStatus();
              props.history.push('./');

          }else{
            alert('Not a valid credentials')
          }
        }
          
          
          // props.history.push('/')
          // setToken(response.data.token);
          ).catch(error => {
           
            console.error('There was an error!', error);
        });
    
  }

   
  return  <Wrapper title='Login Page'>
       <div className="container">
                <form onSubmit={handleSubmit}>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"   value={email}
            onChange={(e) => setEmail(e.target.value)} />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1"   value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
  </Wrapper>  
}

export default  connect()(withRouter(Login)) ;