import axios from 'axios'
import  { useState, useEffect } from "react"
import CakeItem from './CakeItem';

function CakeList(){
    let [cakes, setCakes] = useState([]);
    var [isloading, setLoading] = useState(true);
  

    // component mounted/updated useEffect is called / it also has dependencies
    useEffect(() => {
        
      axios(
        {
          method: 'get',
          url: 'https://apifromashu.herokuapp.com/api/allcakes',
          data: JSON
        }
      ).then((response) => {
  
        console.log('api response--- ',response)
        setCakes(response.data.data)
        setLoading(false)
  
      }, (error) => {
        console.log('error'.error)
      })
    }, []);



    if (cakes) {
        return (
          <div className="row" style={{ justifyContent: "space-around", padding: "1% 2%" }}>
            {cakes.map((each, index) => {
                   return (<CakeItem data={each} key={index}/>)
            })}
            {isloading && <h1 className="text-center m-5">Loading.....</h1>}
          </div>
        )
      }
      else {
        return null
      }
}



export default CakeList;