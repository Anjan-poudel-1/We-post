import React,{useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Box ,Button, Typography} from '@material-ui/core';
import SignInbtn from '../Components/SignInbtn'
import {Wecontext} from '../Context/Wecontext'
import Uploadpost from '../Components/Uploadpost'
import Posts from './Posts';
const useStyles = makeStyles((theme)=>({

    wrap:{
        minHeight:"100vh",
        fontFamily:"Itim,cursive",
        width:"50%",
        margin:"auto",
       
        padding:"40px 60px 60px 60px",
    
        [theme.breakpoints.down('md')]:{
            
            width:"70%",
           
            
        
    },
    [theme.breakpoints.down('xs')]:{
            
        width:"95%",
        padding:"40px 0"
        
    
}

    },
    initalmessage:{
       textAlign:"center"
    },
    

}));

function Body() {

    let classes = useStyles();
    const {user} = useContext(Wecontext);
    return (
        <div className={classes.wrap}>
      

{user?
  
    
 
  
<Uploadpost/>

:<Box className={classes.initalmessage}>
            <Typography style={{marginBottom:"20px"}}> Please Sign in with Google to post and comment!!</Typography> 
              <SignInbtn label="Sign In With Google"/>
           </Box>}

           <Posts/>
          
        </div>
    )
}

export default Body
