import React,{useContext} from 'react'
import {Wecontext} from '../Context/Wecontext'
function ProgressBar() {
    const {progress,filename,url} = useContext(Wecontext);
            

    return (
        
        (filename&&!url)?
        
     <div style={{width:"98%"}}>
         <div style={{width:`${progress+2}%`,height:"5px",borderRadius:"8px",backgroundColor:"#2DACCD",marginTop:"20px"}}>
     </div>
     </div>
        :""



    )
}

export default ProgressBar
