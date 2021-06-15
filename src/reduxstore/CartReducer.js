const CartReducer = (state = {
    cart: [],
    totalItems: 0,
    totalPrice:0,
    success: false,
    removed: false,
    ORDER_PLACE_DATA:{},
    imagePath:'',
    isloading:false
}, action) => {
    switch (action.type) {
        case "ADDTOCART" : {
            state = {...state}
            state.cart.push(action.payload?.data)
            state["totalItems"] += state.cart.length
            state["success"] = true
            state["removed"] = true

            state.totalPrice = 0
            state.cart.map((item) => { 
                state.totalPrice += item.price
         });
         

            return state
        }
        case "SHOW_CART" : {
            state = {...state}
            state["cart"] = action.payload?.data
            state["totalItems"] = action.payload?.data.length
            state["success"] = false
            state["removed"] = false

            state.totalPrice = 0
            state.cart.map((item) => { 
                state.totalPrice += item.price
         });
         
         
            return state
        }
        case "EMPTY_CART" : {
            state = {...state}
            state.cart = []
            state["removed"] = true
            return state
        }
        case "REMOVE_ONE_FROM_CART" : {
            state = {...state}
            state["removed"] = true
            return state
        }
        case "REMOVE_ITEM_FROM_CART" : {
            state = {...state}
            state["removed"] = true
            return state
        }
        case "PLACE_ORDER" : {
            state = {...state}
            state["success"] = true
            return state
        }
        case "PLACE_ORDER_DATA" : {
            state = {...state}
            state["PLACE_ORDER_DATA"] = action.payload?.orderData
            return state
        }

        case "IMAGE_UPLOAD_SUCCESS" : {
			state = {...state}
			console.log('action.payload', action.payload);
			state.imagePath = action.payload.imageUrl
			state['isloading'] = false
			return state 
		}
        default : return state
    }
}

export default CartReducer