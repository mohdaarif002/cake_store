import {createStore, combineReducers, applyMiddleware} from "redux";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import thunk from "redux-thunk";


let middle = store => next => action => {
    let currentDate = new Date()
    console.log(JSON.stringify(action.type) , ' action is dispatched on : ', currentDate)
    next(action)
}


let reducers = combineReducers({AuthReducer, CartReducer})
let store = createStore(reducers, applyMiddleware(middle, thunk))

export default store