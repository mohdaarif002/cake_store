import React from 'react'
import {Link,Redirect,withRouter} from 'react-router-dom'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux"
import { useState, useEffect } from 'react';
import axios from "axios";
import CakeItem from "./CakeItem";
import {connect} from "react-redux";
function Cart(props) {
    
    console.log('cart js    ', props);
    const [cakes, getCakes] = useState([]);
    let totalPrice = 0

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_BASE_URL +'/cakecart',
            method: 'post'
        }).then(res => {
            if (res.data !== 'Session Expired') {
                const cakeList = res.data.data
                getCakes(cakeList);
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList
                    }
                })
            } else {
                props.history.push('/login')
            }
        }, err => {
            console.log('error')
        })
    }, [])

    let emptyCart = (event) => {
		event.preventDefault();
		
		axios({
			url:process.env.REACT_APP_BASE_URL+'/clearcart',
			method:"post",
			data:JSON,
		}).then((response)=>{
			// console.log(response);
			if(response.data.message == 'Removed all  item from cart') {
				props.dispatch({
					type:"EMPTY_CART",
				});
				alert('Removed all  item from cart');
				//setCartData(response.data.data)
			}
		},(error)=>{
			console.log(error);
		});
	}


    // if(props.name){
    //     return <>
    //             <h4>Cart Page</h4>
    //             <Link to="/checkout">Checkout</Link>
    //         </>
        

    // }else{
    //     <Redirect to='/'>/</Redirect>
    // }
	var isDataAvailable = props.cart && props.cart.length > 0 ? true : false;
    return (
		<div className="container">
			<h1>In Cart</h1>	
			<div className="row">
				{isDataAvailable && <div className="col-md-10">
					<div className="row">


						{props.cart.map((each, index) =>  {
							return (<CakeItem data={each} key={index} index={index} page='cart'/>)
						})}
					
					</div>
				</div> }
				{!isDataAvailable &&  <div className="col-md-10"> <h1 className="text-center">No Data found in Cart</h1></div> }

				<div className="col-md-2">
					<button  className="btn btn-sm btn-info m-2" onClick={emptyCart}>Empty Cart <i className="fa fa-shopping-cart"></i></button>
					<Link to="/checkout" className="btn btn-sm btn-info m-2">Checkout</Link>
				</div>		
				
			</div>	
		</div>	
		
	)
}

Cart = withRouter(Cart)

Cart = connect(function (state, props) {
	//console.log("state.CartReducer", state.CartReducer.cart.cart)
	return{
		cart : state.CartReducer.cart,
		totalPrice : state.CartReducer.totalPrice,

	}
})(Cart)

export default Cart



  
  
//   export default withRouter(Cart);
