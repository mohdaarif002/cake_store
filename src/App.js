import axios from "axios";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
// import {carousel} from 'react-bootstrap'
// import data from './components/data'
// import CakeList from './components/Cakelist'

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Pagenotfound from "./components/Pagenotfound";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import CakeDetails from "./components/CakeDetails";
import Search from "./components/Search";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";

import Orders from './components/Orders'
import AddCake from './components/AddCake'



function App() {
  // var details = {
  //   appname: "Cake Store",
  //   username: "Mohd Aarif",
  //   isAuthenitcated: false,
  // };
var details={};
 
  const [isLoggedIn, setLogin] = useState(false);

  axios.interceptors.request.use((request) => {
    request.headers["authtoken"] = localStorage.getItem('token')
    return request
})

  // console.log(process.env.REACT_APP_BASE_URL)
  // console.log(localStorage.getItem("token"));

  useEffect(() => {                            {/* Re Rendered the component on (componentDidMount/componentDidUpdate/Dependency array) */}
    if (localStorage.getItem("token")) {
      axios({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL + "/getuserdetails",
        headers: {
          authtoken: localStorage.token,
        },
      }).then(
        (response) => {
            // console.log('login success response ',response)
            // {role: "user", name: "mohd_aarif", email: "aarif75375@gmail.com", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…DUxfQ.3YzV2XYp-8zKoq-xVPq9miHcwzcdwgSxLyDuLMBWeN0"}
            setLogin(true)
           details={...response.data.data}
console.log('details.............',details);
        }, (error) => console.log(error)
      );
    }
  }, []);

  function changeLoginStatus(){
  // console.log('change login status is called')
    setLogin(true);
  }

 
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          {/* this way borwser data is not passed below one */}
          <Route exact path="/"> <Home /> </Route>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login"  ><Login changeLoginStatus={changeLoginStatus}  /> </Route>
          <Route exact path="/cake/:cakeid" component={CakeDetails}></Route>
          <Route exact path="/search" component={Search}></Route>

          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/cart">
            <Cart name={details.name} />
          </Route>
          <Route exact path="/orders" component={Orders}></Route> 
          <Route exact path="/admin/addcake" component={AddCake}></Route> 
          <Route exact path="/*" component={Pagenotfound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
