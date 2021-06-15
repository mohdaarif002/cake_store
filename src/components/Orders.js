import {useEffect, useState} from 'react'
import axios from "axios";
import { Link} from "react-router-dom"


function Orders(props) {
	var [orderData, setOrderDetails] = useState([]);
	var [isloading, setLoading]    = useState(true);
	useEffect(() => {
		axios({
			url : process.env.REACT_APP_BASE_URL+'/cakeorders/',
			method : 'POST',
			data : JSON}
		).then((response) => {
			//console.log(response.data.cakeorders);
			setOrderDetails(response.data.cakeorders);
			setLoading(false);
		}, (error) => {
			setLoading(false);
		}); 
	}, []);
	
	var isDataAvailble = orderData.length > 0 ? true : false;
	
	return (
		<>
			{isloading && <h1 className="text-center m-5">Loading.....</h1>}
			<h1 className="text-center m-5">My Orders</h1>
			<div className="container">
				<div id="accordion">
				  	{orderData &&  orderData.map((each, index) =>  {
				  		return (
				  		<div className="card" key={index}>
						    <div className="card-header" id={`heading-${each.orderid}`}>
						    	<h5 className="mb-0">
						    	<button className="btn btn-link" data-toggle="collapse" data-target={`#test-${each.orderid}`} aria-expanded="true" aria-controls="">
						        	OrderId #{each.orderid} {each.name} 
						        </button>
						      	</h5>
						    </div>

						    <div id={`test-${each.orderid}`} className="collapse" aria-labelledby={`heading-${each.orderid}`} data-parent="#accordion">
						    	<div className="card-body">
						    		<div className="row">
						    			<div className="col-md-6">
						    				<label>Order Date : { each.orderdate}</label>
						    				<p>Address : { each.address}</p>
						    				<p>City : { each.city}</p>
						    				<p>Phone : { each.phone}</p>
						    				<p>PIN Code : { each.pincode}</p>
						    				<p>Total Price : { each.price}</p>
						    			</div>
						    			<div className="col-md-6">
    							        	<table className="table pull-right ">
    								            <thead className="product-table__header thead-light">
    								               <tr>
    								                  <th scope="col">Product image</th>
    								                  <th scope="col">Description</th>
    								                  <th scope="col">Quantity</th>
    								                  <th scope="col">Price</th>
    								               </tr>
    								            </thead>
    								            <tbody >
    								            	{each.cakes &&  each.cakes.map((each, index) =>  {
    								            		return (
    				            			               	<tr key={index}>
    				            								<td>
    				            									<Link to={"/cake/"+each.cakeid}><img style={{height: "5rem", width: "5rem" }} src={each.image ? each.image : "No_picture_available.png"} className="card-img-top" alt="" /> </Link>
    				            								</td>
    				            								<td> 
    				            									{ each.name}
    				            								</td>
    				            								<td>
    				            									{ each.quantity}	
    				            								</td>
    				            								<td>
    				            									{ each.price}	
    				            								</td>
    				            			               	</tr>
    								            		)
    								            	})}
    								            </tbody>
    								           
    							         	</table>
						    			</div>
						    		</div>
						        	
						      	</div>
						    </div>
				  		</div>
				  		)
				  	})}
				</div>
			</div>
			{!isDataAvailble && <h1 className="text-center m-5">No data found</h1>}

		</>
	)
}


export default Orders;