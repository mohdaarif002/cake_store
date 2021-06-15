

function Wrapper(props) {
    return(
    //   <div className='container'>
    //     {props.children}
    //   </div>
    <div class="modal-content" style={{width:"60%",border: '1px solid darkgrey', margin: 'auto'}}>
    <div class="modal-header">
      <h4 class="modal-title">{props.title}</h4>
    </div>
    <div class="modal-body">
      <p>{props.children}</p>
    </div>
   
  </div>
  
    )
  }

export default Wrapper;