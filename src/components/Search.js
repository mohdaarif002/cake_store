import { useState, useEffect } from "react"
import queryString from 'query-string'
import CakeItem from "./CakeItem"
import axios from 'axios'

function Search(props){
    // console.log(props);
    let [cakes, setCakes] = useState([]);

    const parsed = queryString.parse(props.location.search);
    const searchFor = parsed.q;

   

    useEffect(() => {
        let apiUrl = "https://apibyashu.herokuapp.com/api/searchcakes?q=" + searchFor
        axios({
            method: "GET",
            url: apiUrl
        }).then((response) => {
            if (response.data.data) {
                // console.log(response.data);
                setCakes(response.data.data)
            } else {
                alert('No result is found')
            }
        }, (error) => alert('some error is occured'))
    }, [searchFor])


    if (cakes) {
        return (
            
          <div className="row" style={{ justifyContent: "space-around", padding: "1% 2%" }}>
    
            {cakes.map((each, index) => {
    
                   return (<CakeItem data={each} key={index}/>)
             
            })}

          </div>
    
        )
      }
      else {
       
        return null
         
      }

}


export default Search;