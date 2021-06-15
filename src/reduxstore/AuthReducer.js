import React from "react";

function AuthReducer(state = {
  isLoggedIn: localStorage.token?true:false,
  token: localStorage.token,
  username: localStorage.getItem('userData') ? (JSON.parse(localStorage.getItem('userData'))).name : undefined,
  isLoading: false
}, action) {
  // console.log("state variables ----->>> ", state);

  switch (action.type) {
    case "LOGIN": {
      state = {...state}
      state['isLoggedIn']=true;
      state["token"] = action.payload?.token; //state.token is also valid
      return state;
    }

    case "LOGOUT": {
      state = {...state}
      state['token'] = localStorage.clear()
      state['isLoggedIn'] = false
      return state;
    }
    default:
      return state;
  }
}

export default AuthReducer;
