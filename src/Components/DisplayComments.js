import React,{useContext} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core';
import {Wecontext} from '../Context/Wecontext'
const useStyles = makeStyles((theme)=>({
    wrap:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        paddingBottom:"8px",
       
    },
    comment:{
        marginLeft:"20px",
        [theme.breakpoints.down('sm')]:{
            fontSize:"14px"
        }
    }
}))
function DisplayComments({data,deleteComment}) {
    const {user} = useContext(Wecontext);

    const classes= useStyles();

   
    return (
        <div className={classes.wrap}>
    
        
      <div style={{display:"flex",alignItems:"center",padding:"0 15px"}}>
      { /*<img src={data.data.postdata.personimage} style={{height:"30px",width:"30px",borderRadius:"50%",marginRight:"5px"}}/> */}
      <div style={{fontWeight:"600",fontSize:"15px"}}>{data.data.email.split('@').slice(0, -1).join(' ')}</div> 
        <Typography className={classes.comment} >{data.data.comment}</Typography>
      </div>
        
        
        <div>
       {user? (user.email===data.data.email?<Button color="secondary" style={{padding:"1px",fontSize:"10px"}} onClick={()=>deleteComment(data.id)}>DELETE</Button>:""):""}
        </div>
       
        </div>
    )
}

export default DisplayComments
