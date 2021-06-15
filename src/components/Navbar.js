import {useState} from 'react'
import { Link } from 'react-router-dom'
import Signup from './Signup'
import { Redirect, withRouter } from "react-router";
import {connect} from 'react-redux'


function Navbar(props){


  console.log('navbar props  ',props);
  let searchText;

    let login = () => {
 

    }
    let logout = () => {
      // props.check= !props.check

      localStorage.removeItem('token')

      props.dispatch({
        type:"LOGOUT",
      //   payload: {
      //     token: localStorage.getItem('token'),
      // }
       
      })

    
    }
function getSearchText(e){
    searchText = e.target.value;
  }


function getSearchResults(e){
  e.preventDefault();
  //query string
    if (searchText) {
      var url = "/search?q=" + searchText
      props.history.push(url);
  }
}


    return <>
         
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
 <Link to='/' ><a class="navbar-brand" href="#">RF~ Welcome {props.username?props.username:'Guest'} </a></Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <Link to="/cart">Cart</Link>
        
      </li>
      
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" onChange={getSearchText}  placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" onClick={getSearchResults} type="submit">Search</button>
    </form>
  </div>

  <div style={{ padding: "0 2%" }}>
      { !props.isLoggedIn && <Link to="/login"><button  className="btn btn-outline-info my-2 my-sm-0" type="button">Login</button></Link>}
      {!props.isLoggedIn && <Link to="/signup"><button style={{ marginLeft:"1em" }}  className="btn btn-outline-info my-2 my-sm-0" type="button">Signup</button></Link>}
    
      {props.isLoggedIn?<button onClick={logout}  className="btn btn-outline-success my-2 my-sm-0" type="button">Logout</button>:''}
    
      
    </div>
</nav>


    </>


}



// export default  connect()(withRouter(Navbar));

export default connect((state) => {
  return {
      username: state.AuthReducer.username,
      isLoggedIn: state.AuthReducer.isLoggedIn,
      totalItems: state.CartReducer.totalItems
  }
}) (withRouter(Navbar));