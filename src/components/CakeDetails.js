import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useParams, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {addToCartMiddleware} from "../reduxstore/Middlewares";

function CakeDetails(props) {
  let { cakeid } = useParams();
  var [cake, setCake] = useState([]);
  useEffect(() => {
    var apiUrl = "https://apifromashu.herokuapp.com/api/cake/" + cakeid;
    axios({
      method: "GET",
      url: apiUrl,
    }).then(
      (response) => setCake(response.data.data),
      (error) => console.log(error)
    );
  }, [cakeid]);


  let addToCart = (cake) => {
  
    props.dispatch(addToCartMiddleware(cake))
}

  return (
    <>
      <div class="container">
       
          <div id="productMain" className="row">
                        <div className="col-md-4">
                            <div className="owl-carousel shop-detail-carousel">
                                <div className="item"> <img src={cake.image} alt="" className="img-fluid" /></div>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <h1 className="text-center">{cake.name}</h1>
                                <p className="goToDescription">{cake.description}</p>
                                <p className="price">Rs {cake.price}</p>
                                <p className="text-center buttons"><a href="#" onClick={ () => addToCart(cake)} className="btn btn-primary"><i className="fa fa-shopping-cart"></i> Add to cart</a></p>
                            </div>

                        </div>
                    </div>
          
        
      </div>
    </>
  );
}




CakeDetails = connect(function (state, props){
  if (state.CartReducer.success) {
      props.history.push('/cart')
      state.CartReducer.success = false
  }
})(CakeDetails);


export default withRouter(CakeDetails);