import cartImageMiddleware from "../reduxstore/Middlewares"
import {withRouter} from "react-router-dom"
import { connect, useDispatch } from "react-redux"
import axios from "axios"
import {Component} from "react";

class AddCake extends Component {

	constructor (props) {
		super(props);
		this.state = {
			name 		: '',
			price 		: '',
			weight 		: '',
			description : '',
			type 		: '',
			eggless 	: false,
			flavour     : '',
			ingredients : '',
			image 	    : this.props.imagePath
		}
	}
	

	uploadImage = (event) => {
		event.preventDefault();
		var ImageFile = document.getElementById('image');
		console.log(ImageFile.files[0]);
		var formData = new FormData();
		formData.append('file', ImageFile.files[0])
		console.log(formData);
		this.props.dispatch(cartImageMiddleware(formData))

		this.setState({
			image : this.props.imagePath
		});
	}

	verifyName = (event) => {
		event.preventDefault();
		this.setState({
			name : event.target.value
		});
	}

	verifyPrice = (event) => {
		event.preventDefault();
		this.setState({
			price : event.target.value
		});
	}

	verifyWeight = (event) => {
		event.preventDefault();
		this.setState({
			weight : event.target.value
		});
	}

	verifyDescription = (event) => {
		event.preventDefault();
		this.setState({
			description : event.target.value
		});
	}

	verifyType = (event) => {
		event.preventDefault();
		this.setState({
			type : event.target.value
		});
	}

	verifyEggless = (event) => {
		event.preventDefault();
		console.log('event.target.value', event.target.value);
		if(event.target.value == 'on'){
			this.setState({
				eggless : true
			});
		} else {
			this.setState({
				eggless : false
			});
		}
	}

	verifyFlavour = (event) => {
		event.preventDefault();
		this.setState({
			flavour : event.target.value
		});
	}

	verifyIngredients = (event) => {
		event.preventDefault();
		this.setState({
			ingredients : event.target.value
		});
	}
	addCake = (event) => {
		event.preventDefault();
		
		if(this.state.name == '' || this.state.price == '' || this.state.weight == '' || this.state.description == '' || this.state.type == '' || this.state.flavour == '' || this.state.ingredients == '')
		{
			alert("Please fill all the form fileds")
		} else {
			console.log({'name': this.state.name, 'price':this.state.price, 'weight' : this.state.weight, 'description' : this.state.description, 'type': this.state.type, 'flavour' : this.state.flavour, 'ingredients' : this.state.ingredients, 'image' : this.props.imagePath});
          let cake_data=	{'name': this.state.name, 'price':this.state.price, 'weight' : this.state.weight, 'description' : this.state.description, 'type': this.state.type, 'flavour' : this.state.flavour, 'ingredients' : this.state.ingredients, 'image' : this.props.imagePath};

            axios({
                url : process.env.REACT_APP_BASE_URL+'/addcake',
                method : 'post',
                data :cake_data,
                }
            ).then((response) => {
                
                //  dispatch({
                //         type : "IMAGE_UPLOAD_SUCCESS",
                //         payload : {
                //             imageUrl : response.data.imageUrl
                //         }
                //     });
                    alert("Cake is added successfully")
    
                // console.log('In Image upload',response.data.imageUrl);
                
            }, (error) => {
                console.log('error', error);
                // dispatch({
                //     type : "IMAGE_UPLOAD_FAILURE"
                // });
            });
           
  

            
            this.props.dispatch({
				type: 'ADD_CAKE',
				payload : {'name': this.state.name, 'price':this.state.price, 'weight' : this.state.weight, 'description' : this.state.description, 'type': this.state.type, 'flavour' : this.state.flavour, 'ingredients' : this.state.ingredients, 'image' : this.props.imagePath}
			})
		}
	}
	
	render() {

		return (
			<>
				<div className="container">	
					<h1 className="text-info text-center">Add Cake Details</h1>
					<form  className="">
						<div  className="form-group">
							<label  >Product Image :</label>
							<div  className="preview-img">
							{this.props.imagePath && <img  alt="" src={this.props.imagePath && this.props.imagePath}  style={{height: "10rem", width: "10rem" }}/> }
							</div>
							<div  className="form-group">
								<input  type="file" name="image" id="image" className="form-control" />
								<button  type="button" className="btn btn-primary m-2" onClick= {this.uploadImage}> Upload </button>
								<small>Note: Please upload the image first</small>	
								{this.props.isloading && <h6 className="text-warning"> Image Upload is in progress Please wait </h6> }
							</div>
						</div>
						<div  className="form-group">
							<label  >Cake Name :</label>
							<input  name="name" type="text" id="name" placeholder="Enter your full name" autoComplete="disabled" className="form-control"  onChange ={this.verifyName}/>
						</div>
						<div  className="form-group  owner-details">
							<div>
								<label  >Price :</label> 
								₹<input  type="text" name="price" placeholder="Enter your cake price" id="price" className="form-control" onChange = {this.verifyPrice}/>
							</div>
							<div >
								<label  >Weight:</label>
								<input  type="text" name="weight" placeholder="Enter your cake weight" id="weight" className="form-control" onChange ={this.verifyWeight} /> Kg 
							</div>
						</div>
						<div  className="form-group">
							<label  >Description :</label>
							<input  name="description" type="text" id="description" placeholder="Enter your address" autoComplete="disabled" className="form-control" onChange ={this.verifyDescription}/>
						</div>
						<div  className="form-group ">
							<div  className=" type">
								<label  >Type :</label>
								<select  name="type" className="form-select form-control" id="type" onChange ={this.verifyType}>
									<option  value="">Select Cake type</option>
									<option  value="general">General</option>
									<option  value="special">Special</option>
									<option  value="birthday">Birthday</option>
									<option  value="wedding">Wedding</option>
								</select>
							</div>
							<div  className="form-check form-check-inline">
								<label  >Eggless :</label>
								<input  type="checkbox" name="eggless" id="eggless" className="form-check-input" onChange ={this.verifyEggless} />
							</div>
						</div>
						<div  className="form-group">
							<label  >Flavour :</label>
							<input  type="text" name="flavour" placeholder="Enter your cake flavour" id="flavour" className="form-control" onChange ={this.verifyFlavour}/>
						</div>
						<div  className="form-group">
							<label  >Ingredients :</label>
							<div  className=" ingredient">
								<input  type="text" name="ingredients" placeholder="Enter your ingredient" id="ingredients" className="form-control" onChange ={this.verifyIngredients}/>	
							</div>
						</div>
						<button type="submit" className="btn btn-primary" onClick={this.addCake} >Add Product</button>
					</form>
				</div>
			</>
		)
	}
}

AddCake = withRouter(AddCake)

AddCake = connect(function (state, props) {
		return{
			isloading : state.CartReducer.isloading,
			imagePath : state.CartReducer.imagePath,
			

		}

})(AddCake)

export default AddCake