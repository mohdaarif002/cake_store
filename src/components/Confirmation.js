import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

function Confirmation(props) {

    const handleOrderSubmit = () => {
       
        props.handleOrder();
        // value = value.split("_")
        // data.address = value[0]
        // data.city = value[1]
        // data.pincode = value[2]
        // data.phone = value[3]
        // props.cakes.map((each, index) => {
        //     totalPrice += each.price
        //     return totalPrice
        // })
        // data.name = (JSON.parse(localStorage.getItem('userData'))).name
        // data.price = totalPrice
        // data.cakes = props.cakes
        // console.log('data final value: ', data)
        // props.dispatch(placeOrderMiddleware(data))
    }


    return (
        <div className="container">
           
                <button className="btn btn-primary" onClick={handleOrderSubmit} style={{float: "center"}}>
                        <span>
                            <FontAwesomeIcon icon="arrow-right"/>
                        </span>
                    &nbsp;&nbsp;&nbsp;Place Order
                </button>
        </div>
    )
}


export default connect() (withRouter(Confirmation))