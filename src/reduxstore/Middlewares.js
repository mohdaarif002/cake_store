import axios from "axios"


export const addToCartMiddleware = (data) => {

    return function (dispatch) {
        axios({
            url:process.env.REACT_APP_BASE_URL +'/addcaketocart',
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            dispatch({
                type: "ADDTOCART",
                payload: {
                    data: res.data.data
                }
            })
        }, err => { })
    }
}


export const addCartMiddleware = (data) => {

    return function (dispatch) {
        axios({
            url:process.env.REACT_APP_BASE_URL +'/addcaketocart',
            method: 'post',
            data: {cakeid: data.cakeid, image: data.image, name: data.name, price: data.price, weight: data.weight}
        }).then(res => {
            dispatch({
                type: "ADDTOCART",
                payload: {
                    data: res.data.data
                }
            })
        }, err => { })
    }
}


export const removeCakeFromCartMiddleware = (cakeId) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/removecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            dispatch({
                type: 'REMOVE_ITEM_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}


export const placeOrderMiddleware = (data) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/addcakeorder',
            method: 'post',
            data: data
        }).then(res => {
            console.log('order p[lace res', res)
            dispatch({
                type: 'PLACE_ORDER',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}


export default function cartImageeMiddleware (data) {
	
	return function (dispatch) {
		dispatch({
			type : "IMAGE_UPLOAD_STARTED"
		})
		axios({
			url : process.env.REACT_APP_BASE_URL+'/upload',
			headers : {
				"Content-Type" : "multipart/form-data",
				"Accept": "application/json",
				"type": "formData",
			},
			method : 'post',
			data : data

			}
		).then((response) => {
			
			if(response.data.imageUrl)
			{
				dispatch({
					type : "IMAGE_UPLOAD_SUCCESS",
					payload : {
						imageUrl : response.data.imageUrl
					}
				});
				alert("Image uploaded successfully")
			}

			console.log('In Image upload',response.data.imageUrl);
			
		}, (error) => {
			console.log('error', error);
			dispatch({
				type : "IMAGE_UPLOAD_FAILURE"
			});
		});
	}
}

export const emptyCartMiddleware = () => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/clearcart',
            method: 'post'
        }).then(res => {
            console.log('empty res', res)
            dispatch({
                type: 'EMPTY_CART',
                payload : {
                    data: res.data
                }
            })
        }, err => {})
    }
}

export const removeOneCakeFromCartMiddleware = (cakeId) => {
    return function (dispatch) {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/removeonecakefromcart',
            method: 'post',
            data: {cakeid: cakeId}
        }).then(res => {
            dispatch({
                type: 'REMOVE_ONE_FROM_CART',
                payload: {
                    data: res.data
                }
            })
        }, err => {})
    }
}

