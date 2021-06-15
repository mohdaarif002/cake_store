import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import axios from "axios";

const Address = (props) => {
console.log('addresssssssssss  ',props)

    const [disablePaymentLink, setDisablePaymentLink] = useState(true)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [phone, setPhone] = useState('')

    const submitOrder = (event) => {
		event.preventDefault();
		// if(this.state.name === '' || this.state.name === 'undefined' || this.state.address === '' || this.state.address === 'undefined' || this.state.city  === '' || this.state.city === 'undefined' || this.state.pincode === '' || this.state.pincode === 'undefined' || this.state.phone === '' || this.state.phone === 'undefined') {
		// 	alert("Please enter all form details")
		// }
		//alert(this.state.total_price);
		if(address !== '' ||  city  !== '' || city !== 'undefined' || pincode !== '' || pincode !== 'undefined' || phone !== '' ) {
			
			axios({
				url : process.env.REACT_APP_BASE_URL+'/addCakeOrder', 
				method : "post", 
				data:{name: "aarif", price:props.totalPrice, address: address, 
				city : city, pincode : pincode, phone : phone, cakes:props.cart}
			}).then((response) => {
				if(response.data.messageg === 'order placed')
				{
					alert("Order is placed suucessfully")
					this.props.history.push('/orders');
				}
				//alert(response.data.message);
			}, (error) => {
				console.log(error);

			});
		}
	}

    return (
        <div className="container">
            <form onSubmit={submitOrder}>
                <div className="form-group address">
                    <input value={address} name='address' onChange={e => setAddress(e.target.value)} className="form-control" placeholder="Enter Address"/>
                </div>
                <div className="form-group city">
                    <input value={city} name='city' onChange={e => setCity(e.target.value)} className="form-control" placeholder="Enter City"/>
                </div>
                <div className="form-group pincode">
                    <input value={pincode} name='pincode' onChange={e => setPincode(e.target.value)} className="form-control" placeholder="Enter Pin Code"/>
                </div>
                <div className="form-group phone">
                    <input value={phone} name='phone' onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Enter Phone"/>
                </div>
                <button className="btn btn-primary" style={{float: "right"}}>
                        <span>
                            <FontAwesomeIcon icon="arrow-right"/>
                        </span>
                    &nbsp;&nbsp;&nbsp;Place Order
                </button>
            </form>
        </div>
    )
}

// export default connect() (withRouter(Address))


// Address = withRouter(Address)

export default connect(function (state, props) {
	return{
		cart : state.CartReducer.cart,
		totalPrice : state.CartReducer.totalPrice
	}
})(Address)


// export default Address;