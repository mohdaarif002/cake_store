

import {Route, useRouteMatch,Link, Redirect} from 'react-router-dom'
import Summary from './Summary'
import Address from './Address'
import Confirmation from './Confirmation'

function Checkout(props){

   // const [order_place_data,set_order_place_data]=useState({});
   //  alert(order_place_data)

    let {path}=useRouteMatch();
    console.log(path)
    function handleOrder(){
// alert('hhhkkk')
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



    return <>
    
       <div className="container">
       <div className="row">
          <div className="col-4">
           <Link to={`${path}/summary`}>Summary</Link><hr/>
           <Link to={`${path}/address`}>Address</Link><hr/>
           <Link to={`${path}/confirmation`}>Confirmation</Link><hr/>

          </div>
          <div className="col-8">
           {/* <Route exact path={`${path}`} component={Summary} ></Route> */}
           <Route exact path={`${path}`} ><Redirect to={`${path}/summary`} ></Redirect></Route>
           <Route exact path={`${path}/summary`} component={Summary} ></Route>
           <Route exact path={`${path}/address`} component={Address} ></Route>
           <Route exact path={`${path}/confirmation`} ><Confirmation handleOrder={handleOrder}/></Route>


          </div>

       </div>
       </div>


         
         </>


}



export default Checkout ;

// Cart = connect(function (state, props){
//    set_order_place_data(state.CartReducer.ORDER_PLACE_DATA)
 
//  })(Cart);

//  export default Checkout ;